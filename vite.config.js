import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Set the host to 127.0.0.1
    port: 5173 // Set the port to 5173
  },
  resolve: {
    alias: {
      'pdfjs-dist': 'pdfjs-dist/build/pdf' // Correct alias path
    }
  },
  build: {
    rollupOptions: {
      external: ['pdfjs-dist/build/pdf.worker.min.js'] // Ensure this path is correct
    }
  },
  optimizeDeps: {
    include: ['pdfjs-dist']
  }
});
