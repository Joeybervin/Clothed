import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true
  },
    proxy: {
      '/api': {
        target: `http://api:5555`,
        changeOrigin: true,
        secure: false,      
        ws: true,
        
      },
    },
  },
  
})
