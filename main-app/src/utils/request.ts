import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import { store } from '../store';
import { setLoading } from '../store/slices/globalSlice';
import { ErrorHandler, AppError } from './errors';

/**
 * Axios 请求实例
 * @description 封装的 HTTP 请求工具，集成了错误处理和加载状态管理
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 设置全局loading
    store.dispatch(setLoading({ loading: true }));
    
    // 添加token
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    store.dispatch(setLoading({ loading: false }));
    return Promise.reject(new AppError(
      '请求配置错误',
      ErrorType.SYSTEM,
      'REQUEST_CONFIG_ERROR'
    ));
  }
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response: AxiosResponse) => {
    store.dispatch(setLoading({ loading: false }));
    return response.data;
  },
  (error) => {
    store.dispatch(setLoading({ loading: false }));
    
    const appError = ErrorHandler.handleApiError(error);
    ErrorHandler.handleGlobalError(appError);
    
    return Promise.reject(appError);
  }
);

export default request; 