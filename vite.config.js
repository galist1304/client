import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createServer } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: {
  //     key: 'C:/Users/Deckel/Desktop/todoListApp/client/localhost.key', // Path to your SSL private key
  //     cert: 'C:/Users/Deckel/Desktop/todoListApp/client/localhost.crt' // Path to your SSL certificate
  //   }
  // }
})
