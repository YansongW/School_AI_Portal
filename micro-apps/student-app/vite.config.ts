import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import qiankun from 'vite-plugin-qiankun';

export default defineConfig({
  plugins: [
    react(),
    qiankun('studentApp', {
      useDevMode: true
    })
  ],
  server: {
    port: 3001,
    cors: true,
  },
}); 