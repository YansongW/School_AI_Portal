import React from 'react';
import { Card, List, Badge } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import type { TodoItem } from '../../../../types';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.items);

  return (
    <Card title="待办事项" className="h-full">
      <List
        dataSource={todos}
        renderItem={(item: TodoItem) => (
          <List.Item
            className="cursor-pointer hover:bg-gray-50 rounded-lg px-4"
            onClick={() => window.location.href = item.url}
          >
            <div className="flex items-center justify-between w-full">
              <span>{item.title}</span>
              <Badge count={item.count} />
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TodoList; 