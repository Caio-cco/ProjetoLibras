import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodePolyfills from 'rollup-plugin-node-polyfills'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis'
  },
  resolve: {
    alias: {
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6'
    }
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()]
    }
  }
})
