import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@features': path.resolve(__dirname, './src/features'),
      '@components': path.resolve(__dirname, './src/components'),
      '@customerpages': path.resolve(__dirname, './src/pages/customer'),
      '@adminpages': path.resolve(__dirname, './src/pages/admin'),
      '@doctorpages': path.resolve(__dirname, './src/pages/doctor'),
    },
  },
})
