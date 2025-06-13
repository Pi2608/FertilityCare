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
  async ({ emailOrPhone, password }, thunkAPI) => {
    try {
      const res = await apiGateway.login(emailOrPhone, password);
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
    },
    clearError: (state) => {
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
        const { userId, token, user } = action.payload;
        // Handle both response formats
        state.userId = userId || user?.id;
        state.token = token;
        state.isAuthenticated = true;
        state.error = null;
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
        const { userId, token, user } = action.payload;
        // Handle both response formats
        state.userId = userId || user?.id;
        state.token = token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;