/// <reference types="vite/client" />

// 全局变量声明
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
    __MICRO_APP_COMMUNICATION__?: {
      sendMessage: (message: any) => void;
      subscribeMessage: (callback: (message: any) => void) => () => void;
    };
  }
}

export {}; 