import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],
  base: './',
  build: {
    outDir: 'dist/client',
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('pinia')) {
              return 'vue'
            }
            if (id.includes('vant')) {
              return 'vant'
            }
            if (id.includes('axios')) {
              return 'axios'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
