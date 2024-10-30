import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

/**
 * 路由懒加载配置
 * @description 使用 React.lazy 实现组件懒加载
 */
const HomePage = React.lazy(() => import('../pages/Home'));
const LoginPage = React.lazy(() => import('../pages/Login'));
const UserSettingsPage = React.lazy(() => import('../pages/UserSettings'));
const AIChatPage = React.lazy(() => import('../pages/AIChat'));

/**
 * 路由加载时的loading组件
 */
const LoadingComponent: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-primary">页面加载中...</div>
  </div>
);

/**
 * 路由配置
 * @description 包含了所有页面的路由配置
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/home',
        element: (
          <React.Suspense fallback={<LoadingComponent />}>
            <HomePage />
          </React.Suspense>
        ),
      },
      {
        path: '/ai-chat',
        element: (
          <React.Suspense fallback={<LoadingComponent />}>
            <AIChatPage />
          </React.Suspense>
        ),
      },
      {
        path: '/settings',
        element: (
          <React.Suspense fallback={<LoadingComponent />}>
            <UserSettingsPage />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <React.Suspense fallback={<LoadingComponent />}>
        <LoginPage />
      </React.Suspense>
    ),
  },
]); 