import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/meme-generator/', // 👈 IMPORTANT (repo name)
  server: {
    port: 5173,
    open: true
  },
  css: {
    postcss: './postcss.config.js',
  }
})