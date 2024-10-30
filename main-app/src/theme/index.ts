import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#6A00FF',
    borderRadius: 4,
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue"',
  },
  components: {
    Button: {
      borderRadius: 4,
      controlHeight: 40,
    },
    Input: {
      controlHeight: 40,
    },
    Card: {
      borderRadius: 8,
    },
  },
}; 