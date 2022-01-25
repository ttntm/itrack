import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  build: {
    cssCodeSplit: false
  },
  optimizeDeps: {
    include: [
      'vue',
      'vuedraggable'
    ]
  },
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    // https://github.com/vuejs/vue-next/issues/2064#issuecomment-797365133
    dedupe: ['vue']
  }
})