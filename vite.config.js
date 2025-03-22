import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/RescueBit',
  server: {
    proxy: {
      '/api': {
        target: 'https://ngoapi.onrender.com',
        changeOrigin: true,
        secure: false, // Ignore HTTPS errors (if any)
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
