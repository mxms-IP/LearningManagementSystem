import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      'uniqid': 'uniqid'
    }
  }
})
