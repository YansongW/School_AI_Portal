import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { UserInfo } from '../../types';

interface UserState {
  currentUser: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

// 异步登录action
export const login = createAsyncThunk(
  'user/login',
  async (credentials: { username: string; password: string }) => {
    // 预留登录接口
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
    updateUserInfo: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message || '登录失败';
        state.loading = false;
      });
  },
});

export const { logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer; 