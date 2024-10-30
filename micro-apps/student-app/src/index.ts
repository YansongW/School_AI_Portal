import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let root: any = null;

export async function bootstrap() {
  console.log('子应用启动');
}

export async function mount(props: any) {
  root = ReactDOM.createRoot(
    props.container ? props.container.querySelector('#root') : document.getElementById('root')
  );
  root.render(<App />);
}

export async function unmount() {
  root?.unmount();
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
} 