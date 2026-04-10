import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: 'localhost',
    port: 5170,
    strictPort: true,
  },
  preview: {
    host: 'localhost',
    port: 5170,
    strictPort: true,
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
});
