import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages sirve el sitio desde /<repositorio>/
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
})
