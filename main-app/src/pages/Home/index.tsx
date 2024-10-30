import React, { useEffect } from 'react';
import { Row, Col, Card, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchHomeData } from '../../store/slices/homeSlice';
import SearchBar from './components/SearchBar';
import TodoList from './components/TodoList';
import AIChat from './components/AIChat';
import QuickServices from './components/QuickServices';
import NewsCarousel from './components/NewsCarousel';

/**
 * 首页组件
 * @description 门户网站的主页面，包含搜索、AI对话、待办事项等模块
 */
const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.home);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        await dispatch(fetchHomeData()).unwrap();
      } catch (err) {
        message.error(t('home.loadError'));
      }
    };

    loadHomeData();
  }, [dispatch, t]);

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 搜索栏 */}
      <SearchBar />
      
      {/* 主要内容区域 */}
      <Row gutter={[24, 24]}>
        <Col span={16}>
          <NewsCarousel />
        </Col>
        <Col span={8}>
          <AIChat />
        </Col>
      </Row>

      {/* 服务和待办区域 */}
      <Row gutter={[24, 24]}>
        <Col span={16}>
          <QuickServices />
        </Col>
        <Col span={8}>
          <TodoList />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage; 