import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/slices/userSlice';

/**
 * 认证相关的自定义Hook
 * @returns 认证相关的方法和状态
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.currentUser);

  const handleLogout = useCallback(async () => {
    await dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  const checkAuth = useCallback(() => {
    if (!user) {
      navigate('/login');
      return false;
    }
    return true;
  }, [user, navigate]);

  return {
    user,
    isAuthenticated: !!user,
    logout: handleLogout,
    checkAuth,
  };
}; 