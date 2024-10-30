import React, { useState } from 'react';
import { Card, Input, Button, List, Avatar } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import type { AIChatMessage } from '../../../../types';

const AIChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.aiChat.messages);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // TODO: 调用AI接口
    console.log('发送消息:', message);
    setMessage('');
  };

  return (
    <Card title="AI助手" className="h-full">
      <div className="flex flex-col h-[400px]">
        <List
          className="flex-1 overflow-y-auto mb-4"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item: AIChatMessage) => (
            <List.Item className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex ${item.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[80%]`}>
                <Avatar icon={item.type === 'user' ? <UserOutlined /> : <RobotOutlined />} />
                <div className={`mx-2 p-2 rounded-lg ${item.type === 'user' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                  {item.content}
                </div>
              </div>
            </List.Item>
          )}
        />
        
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onPressEnter={handleSend}
            placeholder="输入您的问题..."
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />}
            onClick={handleSend}
          />
        </div>
      </div>
    </Card>
  );
};

export default AIChat; 