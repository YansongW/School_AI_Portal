import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user.currentUser);
  const isLoading = useAppSelector(state => state.global.loading);

  // 检查用户登录状态
  useEffect(() => {
    if (!user && window.location.pathname !== '/login') {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Layout className="min-h-screen">
      {/* 全局加载状态 */}
      {isLoading && <GlobalLoading />}
      
      {/* 头部导航 */}
      <Header />
      
      {/* 主要内容区域 */}
      <Content className="p-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </Content>
      
      {/* 微前端子应用容器 */}
      <div id="subapp-container" />
    </Layout>
  );
};

export default MainLayout; 