import { useAppSelector, useAppDispatch } from '../store';
import { setLoading } from '../store/slices/globalSlice';

/**
 * 全局加载状态Hook
 * @returns 加载状态相关的方法和状态
 */
export const useLoading = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.global.loading);

  const showLoading = (text?: string) => {
    dispatch(setLoading({ loading: true, text }));
  };

  const hideLoading = () => {
    dispatch(setLoading({ loading: false }));
  };

  return {
    loading,
    showLoading,
    hideLoading,
  };
}; 