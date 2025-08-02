import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 12001,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:12000',
        changeOrigin: true,
        secure: false,
      },
    },
    cors: true,
    hmr: {
      overlay: true,
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
