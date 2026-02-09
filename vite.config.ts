import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Isso deve corresponder ao nome do seu repositório no GitHub
  base: '/cfa-brm/',
})