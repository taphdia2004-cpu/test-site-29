import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const configuredBasePath = process.env.BASE_PATH?.replace(/\/$/, '');
const base = configuredBasePath ? `${configuredBasePath}/` : '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'app-bundle',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
});
