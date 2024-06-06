import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, import.meta.url);

  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    build: {
      outDir: 'build',
    },
    css: {
      modules: {
        localsConvention: "camelCase",
      }
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
      'import.meta.env.VITE_SESSION_KEY': JSON.stringify(env.VITE_SESSION_KEY)
    }
  }
});
