import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
        rewrite: (path) => {
          const rewrittenPath = path.replace(/^\/api/, '');
          console.log(`Rewriting ${path} to ${rewrittenPath}`);
          return rewrittenPath;
        },
      },
    },
  },
})
