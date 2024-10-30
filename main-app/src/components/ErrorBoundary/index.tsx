import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  /**
   * 从错误中派生状态
   */
  public static getDerivedStateFromError(error: Error): State {
    const appError = error instanceof AppError
      ? error
      : new AppError(
          error.message,
          ErrorType.SYSTEM,
          'RENDER_ERROR'
        );

    return {
      hasError: true,
      error: appError,
    };
  }

  /**
   * 错误捕获和报告
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('错误边界捕获到错误:', error, errorInfo);
    
    // 调用错误处理器
    ErrorHandler.handleGlobalError(error);
    
    // 调用自定义错误处理回调
    this.props.onError?.(error, errorInfo);
  }

  /**
   * 重试处理函数
   */
  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  public render() {
    if (this.state.hasError) {
      // 如果提供了自定义的 fallback UI，则使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认的错误 UI
      return (
        <Result
          status="error"
          title="页面出错了"
          subTitle={this.state.error?.message || '发生了未知错误'}
          extra={[
            <Button 
              type="primary" 
              key="retry"
              onClick={this.handleRetry}
            >
              重试
            </Button>,
            <Button 
              key="home"
              onClick={() => window.location.href = '/'}
            >
              返回首页
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 