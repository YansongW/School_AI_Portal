import React from 'react';
import { Card, Form, Input, Button, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/userSlice';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      await dispatch(login(values)).unwrap();
      message.success(t('login.success'));
      navigate('/');
    } catch (error) {
      message.error(t('login.failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[420px] shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">{t('login.title')}</h1>
        
        <Tabs
          items={[
            {
              key: 'account',
              label: t('login.accountLogin'),
              children: (
                <Form form={form} onFinish={handleSubmit}>
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: t('login.usernameRequired') }]}
                  >
                    <Input 
                      prefix={<UserOutlined />} 
                      placeholder={t('login.usernamePlaceholder')} 
                      size="large"
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: t('login.passwordRequired') }]}
                  >
                    <Input.Password 
                      prefix={<LockOutlined />} 
                      placeholder={t('login.passwordPlaceholder')}
                      size="large"
                    />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                      {t('login.submit')}
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: 'phone',
              label: t('login.phoneLogin'),
              children: (
                <Form form={form} onFinish={handleSubmit}>
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: t('login.phoneRequired') }]}
                  >
                    <Input 
                      prefix={<PhoneOutlined />} 
                      placeholder={t('login.phonePlaceholder')}
                      size="large"
                    />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                      {t('login.getCode')}
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Login; 