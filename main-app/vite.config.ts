import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

/**
 * Vite 项目配置
 * @description 包含了项目的基础配置、构建配置、代理配置等
 */
export default defineConfig({
  // 插件配置
  plugins: [
    react(),
    // 启用 GZIP 压缩
    compression({
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 生成的压缩包后缀
    }),
    // 构建分析插件
    visualizer({
      open: true, // 自动打开分析报告
      gzipSize: true, // 显示 gzip 大小
    }),
  ],
  
  // 构建配置
  build: {
    rollupOptions: {
      output: {
        // 代码分包配置
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'antd-vendor': ['antd', '@ant-design/icons'],
          'utils-vendor': ['dayjs', 'axios', 'lodash'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // 包大小警告限制
  },
  
  // 开发服务器配置
  server: {
    port: 3000, // 开发服务器端口
    host: true, // 监听所有地址
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});