import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { HomeData } from '../../types';
import request from '../../utils/request';

/**
 * 首页数据接口
 */
interface HomeState {
  data: HomeData | null;
  loading: boolean;
  error: string | null;
}

/**
 * 初始状态
 */
const initialState: HomeState = {
  data: null,
  loading: false,
  error: null,
};

/**
 * 获取首页数据
 */
export const fetchHomeData = createAsyncThunk(
  'home/fetchData',
  async () => {
    const response = await request.get<HomeData>('/api/home');
    return response.data;
  }
);

/**
 * Home Slice
 */
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clearHomeData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '加载失败';
      });
  },
});

export const { clearHomeData } = homeSlice.actions;
export default homeSlice.reducer; 