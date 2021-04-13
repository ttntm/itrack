import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name].[ext]`,
      }
    }
  },
  optimizeDeps: {
    include: [
      'vue'
    ]
  },
  plugins: [
    vue()
  ]
});