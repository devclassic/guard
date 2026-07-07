import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

const Warn = () => {
  return {
    name: 'filter-rolldown-warnings',
    enforce: 'pre',
    configResolved(config) {
      const originalWarn = config.logger.warn
      config.logger.warn = (msg, options) => {
        if (typeof msg === 'string' && msg.includes('INVALID_ANNOTATION')) return
        originalWarn(msg, options)
      }
    },
  }
}

export default defineConfig({
  plugins: [Vue(), Warn()],
  base: './',
  build: {
    outDir: 'dist/admin',
    chunkSizeWarningLimit: 10000,
  },
})
