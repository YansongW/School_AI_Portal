import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store';
import { theme } from '../theme';
import ErrorBoundary from '../components/ErrorBoundary';
import GlobalLoading from '../components/GlobalLoading';
import GlobalNotification from '../components/GlobalNotification';

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <ErrorBoundary>
            {children}
            <GlobalLoading />
            <GlobalNotification />
          </ErrorBoundary>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
};

export default GlobalProvider; 