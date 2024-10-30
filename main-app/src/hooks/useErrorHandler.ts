import { useCallback } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ErrorHandler, AppError, ErrorType } from '../utils/errors';

/**
 * 错误处理 Hook
 * @description 提供统一的错误处理方法
 */
export const useErrorHandler = () => {
  const navigate = useNavigate();

  /**
   * 处理错误的回调函数
   */
  const handleError = useCallback((error: any) => {
    const appError = error instanceof AppError
      ? error
      : ErrorHandler.handleApiError(error);

    switch (appError.type) {
      case ErrorType.AUTH:
        // 处理认证错误
        message.error(appError.message);
        navigate('/login');
        break;

      case ErrorType.VALIDATION:
        // 处理表单验证错误
        message.error(appError.message);
        console.log('验证错误详情:', appError.details);
        break;

      case ErrorType.NETWORK:
        // 处理网络错误
        message.error('网络连接失败，请检查网络设置');
        break;

      case ErrorType.BUSINESS:
        // 处理业务逻辑错误
        message.warning(appError.message);
        break;

      default:
        // 处理其他系统错误
        message.error('系统错误，请稍后重试');
        console.error(appError);
    }
  }, [navigate]);

  return {
    handleError,
    ErrorHandler,
  };
}; 