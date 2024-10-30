import React from 'react';
import { Layout, Menu, Button, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const languageMenu = {
    items: [
      { key: 'zh', label: '中文' },
      { key: 'en', label: 'English' },
    ],
    onClick: ({ key }: { key: string }) => {
      i18n.changeLanguage(key);
    },
  };

  return (
    <AntHeader className="bg-white shadow-md flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary mr-8">
          {t('header.portal')}
        </h1>
        <Menu mode="horizontal" className="border-0">
          <Menu.Item key="home">首页</Menu.Item>
          <Menu.Item key="services">服务大厅</Menu.Item>
          <Menu.Item key="ai">AI助手</Menu.Item>
        </Menu>
      </div>
      
      <div className="flex items-center gap-4">
        <Dropdown menu={languageMenu}>
          <Button icon={<GlobalOutlined />} type="text" />
        </Dropdown>
        
        {user ? (
          <Dropdown menu={{
            items: [
              { key: 'profile', label: '个人信息' },
              { key: 'logout', label: '退出登录' },
            ]
          }}>
            <Button icon={<UserOutlined />} type="text">
              {user.name}
            </Button>
          </Dropdown>
        ) : (
          <Button type="primary">{t('header.login')}</Button>
        )}
      </div>
    </AntHeader>
  );
};

export default Header; 