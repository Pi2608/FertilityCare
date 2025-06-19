import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiGateway from '../service/apiGateway';
import customerApiGateway from '../service/customerApiGateway';

const initialState = {
  userId: null,
  token: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Helper function to save auth data to localStorage
const saveAuthToStorage = (token, userId) => {
  if (token) localStorage.setItem("token", token);
  if (userId) localStorage.setItem("userId", userId.toString());
};

// Helper function to clear auth data from localStorage
const clearAuthFromStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await apiGateway.login(email, password);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Đăng nhập thất bại'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      await customerApiGateway.register(userData);
      const res = await apiGateway.login(userData.email, userData.password);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Đăng ký thất bại'
      );
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      
      if (!token) {
        return thunkAPI.rejectWithValue('No token found');
      }

      // Set token for API calls
      apiGateway.setAuthToken(token);
      
      // Get user role - now with proper await
      const res = await apiGateway.getUserRole();
      
      return {
        token,
        userId: userId ? parseInt(userId) : null,
        role: res.data?.roleName || null,
      };
    } catch (err) {
      // Token is invalid, clear from localStorage
      clearAuthFromStorage();
      return thunkAPI.rejectWithValue('Token invalid or expired');
    }
  }
);

// Optional: Add logout thunk for server-side logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      clearAuthFromStorage();
      return {};
    } catch (err) {
      clearAuthFromStorage();
      return {};
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous logout for immediate local cleanup
    logout: (state) => {
      state.userId = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
      clearAuthFromStorage();
    },
    clearError: (state) => {
      state.error = null;
    },
    resetLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, data, user } = action.payload;
        const actualUserId = userId || user?.id;
        
        state.userId = actualUserId;
        state.token = data;
        state.isAuthenticated = true;
        state.error = null;
        
        saveAuthToStorage(data, actualUserId);
        
        console.log("Login successful:", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.userId = null;
        state.token = null;
        state.role = null;
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, user, data } = action.payload;
        const actualUserId = userId || user?.id;
        
        state.userId = actualUserId;
        state.token = data;
        state.isAuthenticated = true;
        state.error = null;
        
        // Save to localStorage
        saveAuthToStorage(data, actualUserId);
        
        console.log("Register successful:", action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.userId = null;
        state.token = null;
        state.role = null;
      })
      
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { role, token, userId } = action.payload;
        state.role = role;
        state.token = token;
        state.userId = userId;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem("role", role);
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.role = null;
        state.token = null;
        state.userId = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      
      // Logout cases (if using async logout)
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.userId = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Even if logout fails, clear the state
        state.loading = false;
        state.userId = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { logout, clearError, resetLoading } = authSlice.actions;
export default authSlice.reducer;