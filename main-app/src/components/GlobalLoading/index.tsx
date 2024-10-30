import React from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const GlobalLoading: React.FC = () => {
  const { loading, loadingText } = useSelector((state: RootState) => state.global);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Spin size="large" />
        {loadingText && (
          <div className="mt-4 text-gray-600">{loadingText}</div>
        )}
      </div>
    </div>
  );
};

export default GlobalLoading; 