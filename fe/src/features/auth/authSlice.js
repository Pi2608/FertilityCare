import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiGateway from '../service/apiGateway';

const initialState = {
  userId: null,
  token: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Helper function to save auth data to localStorage
const saveAuthToStorage = (token) => {
  if (token) localStorage.setItem("token", token);
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
      await apiGateway.register(userData);
      return { success: true, email: userData.email };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Đăng ký thất bại'
      );
    }
  }
);

export const confirmRegister = createAsyncThunk(
  'auth/confirmRegister',
  async ({ email, otp, password }, thunkAPI) => {
    try {
      // Gọi API xác thực OTP
      await apiGateway.confirmRegister({ email, otp });

      // OTP hợp lệ → đăng nhập
      const loginResult = await thunkAPI.dispatch(loginUser({ email, password }));

      // Nếu login thành công → trả kết quả login về
      if (loginUser.fulfilled.match(loginResult)) {
        return loginResult.payload;
      } else {
        return thunkAPI.rejectWithValue("Xác thực OTP thành công nhưng đăng nhập thất bại");
      }

    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Xác thực OTP thất bại'
      );
    }
  }
);


export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      var userName = "";
      
      if (!token) {
        return thunkAPI.rejectWithValue('No token found');
      }

      // Set token for API calls
      apiGateway.setAuthToken(token);

      // Get user role - now with proper await
      const res1 = await apiGateway.getUserRole();
      
      if (!res1.data) {
        return thunkAPI.rejectWithValue('No user role found');
      }

      if (res1.data?.roleName === "customer") {
        //Get user info
        const res2 = await apiGateway.getUserInfo();
        userName = res2.data?.name || "";
      }
      
      return {
        token,
        role: res1.data?.roleName || null,
        userName: userName || null,
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
        
        saveAuthToStorage(data);
        
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
        state.error = null;        
        console.log("Register request sent, waiting for OTP:", action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.userId = null;
        state.token = null;
        state.role = null;
      })
      .addCase(confirmRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmRegister.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, data, user } = action.payload;
        const actualUserId = userId || user?.id;

        state.userId = actualUserId;
        state.token = data;
        state.isAuthenticated = true;
        state.error = null;

        saveAuthToStorage(data);

        console.log("Xác thực OTP + Đăng nhập thành công:", action.payload);
      })
      .addCase(confirmRegister.rejected, (state, action) => {
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
        const { role, token, userName } = action.payload;
        state.role = role;
        state.token = token;
        state.userName = userName;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem("role", role);
        localStorage.setItem("userName", userName);
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