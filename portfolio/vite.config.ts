import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
    const base = isProduction
      ? (repoName?.endsWith('.github.io') ? '/' : `/${repoName || 'portfolio'}/`)
      : '/';
    return {
      base,
      server: {
        port: 5173,
        host: '127.0.0.1',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
