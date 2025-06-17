import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiGateway from '../service/apiGateway';

const initialState = {
  userId: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Async thunks - defined before the slice
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await apiGateway.login(email, password);
      return res.data; // Expected: { userId, token } or { user: { id }, token }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const res = await apiGateway.register(userData);
      return res.data; // Expected: { userId, token } or { user: { id }, token }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Đăng ký thất bại');
    }
  }
);

// Thêm async thunk để kiểm tra và khôi phục trạng thái từ localStorage
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      
      if (!token) {
        return thunkAPI.rejectWithValue('No token found');
      }

      // Nếu bạn có API để verify token, uncomment dòng này:
      // const res = await apiGateway.verifyToken(token);
      
      return {
        token: token,
        userId: userId,
      };
    } catch (err) {
      // Token không hợp lệ, xóa khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return thunkAPI.rejectWithValue('Token invalid');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { userId, token } = action.payload;
      state.userId = userId;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
    clearError: (state) => {
      state.error = null;
    },
    // Action để khôi phục trạng thái
    restoreAuth: (state, action) => {
      const { userId, token } = action.payload;
      state.userId = userId;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, data, user } = action.payload;
        const actualUserId = userId || user?.id;
        
        // Handle both response formats
        state.userId = actualUserId;
        state.token = data;
        state.isAuthenticated = true;
        state.error = null;
        
        // Lưu vào localStorage
        if (data) {
          localStorage.setItem("token", `${data}`);
        }
        if (actualUserId) {
          localStorage.setItem("userId", `${actualUserId}`);
        }
        
        console.log("Login successful:", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, token, user, data } = action.payload;
        const actualUserId = userId || user?.id;
        const actualToken = token || data;
        
        // Handle both response formats
        state.userId = actualUserId;
        state.token = actualToken;
        state.isAuthenticated = true;
        state.error = null;
        
        // Lưu vào localStorage
        if (actualToken) {
          localStorage.setItem("token", `${actualToken}`);
        }
        if (actualUserId) {
          localStorage.setItem("userId", `${actualUserId}`);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, token } = action.payload;
        state.userId = userId;
        state.token = token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.userId = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { login, logout, clearError, restoreAuth } = authSlice.actions;
export default authSlice.reducer;