import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  console.log(`output->mode`,mode)
  return {
    plugins: [vue()],
    base: mode === 'development' ? './' : '/exam/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src')
      }
    }
  }
})
