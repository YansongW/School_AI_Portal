import React from 'react';
import { Card, Tabs, Form, Input, Button, Upload, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { updateUserInfo } from '../../store/slices/userSlice';

const UserSettings: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleBasicInfoSubmit = async (values: any) => {
    try {
      await dispatch(updateUserInfo(values)).unwrap();
      message.success('更新成功');
    } catch (error) {
      message.error('更新失败');
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <Tabs
        items={[
          {
            key: 'basic',
            label: '基本信息',
            children: (
              <Form
                layout="vertical"
                initialValues={user}
                onFinish={handleBasicInfoSubmit}
              >
                <Form.Item label="头像">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    action="/api/upload"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt="avatar" className="w-full" />
                    ) : (
                      <div>
                        <UploadOutlined />
                        <div className="mt-2">上传头像</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>

                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                  label="邮箱"
                  name="email"
                  rules={[
                    { required: true },
                    { type: 'email' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存修改
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
          {
            key: 'security',
            label: '安全设置',
            children: (
              <Form layout="vertical">
                <Form.Item label="修改密码">
                  <Button type="primary">修改密码</Button>
                </Form.Item>
                
                <Form.Item label="两步验证">
                  <Button>开启两步验证</Button>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
    </Card>
  );
};

export default UserSettings; 