import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 adiciona esse trecho aqui
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis'
  }
})
