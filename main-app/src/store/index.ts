import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import aiChatReducer from './slices/aiChatSlice';
import globalReducer from './slices/globalSlice';

/**
 * Redux Store 配置
 * @description 全局状态管理配置
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    aiChat: aiChatReducer,
    global: globalReducer,
  },
  // 开发环境启用 Redux DevTools
  devTools: process.env.NODE_ENV !== 'production',
});

// 导出 Store 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * 自定义 Hook：获取 dispatch 函数
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * 自定义 Hook：获取 store 状态
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;