import { registerMicroApps, start } from 'qiankun';
import type { MicroApp } from '../types';

// 微前端应用配置
const microApps: MicroApp[] = [
  {
    name: 'studentApp', // 学生服务子应用
    entry: process.env.VITE_STUDENT_APP_ENTRY || '//localhost:3001',
    container: '#subapp-container',
    activeRule: '/student',
  },
  {
    name: 'teacherApp', // 教师服务子应用
    entry: process.env.VITE_TEACHER_APP_ENTRY || '//localhost:3002',
    container: '#subapp-container',
    activeRule: '/teacher',
  }
];

// 注册子应用
registerMicroApps(microApps, {
  beforeLoad: [
    app => {
      console.log('before load', app.name);
      return Promise.resolve();
    },
  ],
  beforeMount: [
    app => {
      console.log('before mount', app.name);
      return Promise.resolve();
    },
  ],
});

// 启动微前端服务
export const startQiankun = () => {
  start({
    prefetch: true, // 开启预加载
    sandbox: { strictStyleIsolation: true }, // 严格的样式隔离
  });
};