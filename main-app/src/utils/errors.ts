/**
 * 自定义错误类型
 * @description 定义系统中可能出现的各种错误类型
 */
export enum ErrorType {
  NETWORK = 'NETWORK',           // 网络错误
  AUTH = 'AUTH',                 // 认证错误
  VALIDATION = 'VALIDATION',     // 数据验证错误
  BUSINESS = 'BUSINESS',         // 业务逻辑错误
  SYSTEM = 'SYSTEM',            // 系统错误
}

/**
 * 自定义错误类
 * @class AppError
 * @extends Error
 */
export class AppError extends Error {
  type: ErrorType;
  code: string;
  details?: any;

  constructor(message: string, type: ErrorType, code: string, details?: any) {
    super(message);
    this.type = type;
    this.code = code;
    this.details = details;
    this.name = 'AppError';
  }
}

/**
 * 错误处理工具类
 * @description 统一处理系统中的各种错误
 */
export class ErrorHandler {
  /**
   * 处理API错误
   * @param error - 错误对象
   * @returns 格式化后的错误信息
   */
  static handleApiError(error: any): AppError {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          return new AppError(
            '用户未认证或登录已过期',
            ErrorType.AUTH,
            'AUTH_FAILED'
          );
        case 403:
          return new AppError(
            '没有操作权限',
            ErrorType.AUTH,
            'PERMISSION_DENIED'
          );
        case 404:
          return new AppError(
            '请求的资源不存在',
            ErrorType.BUSINESS,
            'RESOURCE_NOT_FOUND'
          );
        case 422:
          return new AppError(
            '数据验证失败',
            ErrorType.VALIDATION,
            'VALIDATION_FAILED',
            data.errors
          );
        default:
          return new AppError(
            data.message || '服务器错误',
            ErrorType.SYSTEM,
            'SYSTEM_ERROR'
          );
      }
    }
    
    if (error.request) {
      return new AppError(
        '网络请求失败',
        ErrorType.NETWORK,
        'NETWORK_ERROR'
      );
    }
    
    return new AppError(
      error.message || '未知错误',
      ErrorType.SYSTEM,
      'UNKNOWN_ERROR'
    );
  }

  /**
   * 全局错误处理函数
   * @param error - 错误对象
   * @param errorCallback - 错误处理回调函数
   */
  static handleGlobalError(
    error: any,
    errorCallback?: (error: AppError) => void
  ) {
    const appError = error instanceof AppError
      ? error
      : ErrorHandler.handleApiError(error);

    console.error('[Error]:', {
      type: appError.type,
      code: appError.code,
      message: appError.message,
      details: appError.details,
    });

    errorCallback?.(appError);
  }
} 