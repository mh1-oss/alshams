import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // lightningcss strips the unprefixed `backdrop-filter`, breaking the frosted-glass header
    cssMinify: false,
  },
})
