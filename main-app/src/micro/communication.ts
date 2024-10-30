import { Subject } from 'rxjs';

// 定义消息类型
export interface MicroAppMessage {
  type: string;
  payload: any;
  from: string;
  to?: string;
}

// 创建消息总线
const messageBus = new Subject<MicroAppMessage>();

// 发送消息
export const sendMessage = (message: MicroAppMessage) => {
  messageBus.next(message);
};

// 订阅消息
export const subscribeMessage = (
  callback: (message: MicroAppMessage) => void,
  filter?: (message: MicroAppMessage) => boolean
) => {
  const subscription = messageBus
    .pipe(filter ? filter : (message) => true)
    .subscribe(callback);
  
  return () => subscription.unsubscribe();
};

// 初始化子应用通信
export const initMicroAppCommunication = (appName: string) => {
  window.__MICRO_APP_COMMUNICATION__ = {
    sendMessage: (message: Omit<MicroAppMessage, 'from'>) => {
      sendMessage({ ...message, from: appName });
    },
    subscribeMessage: (callback: (message: MicroAppMessage) => void) => {
      return subscribeMessage(callback, 
        (message) => !message.to || message.to === appName
      );
    },
  };
}; 