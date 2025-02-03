import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', 'react-modal'],
  },
  build: {
    rollupOptions: {
      external: ['react-modal'],
    },
  },
});
