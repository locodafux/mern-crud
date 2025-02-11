import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      imports: [
        'vue', // Keep Vue auto-import
        {
          axios: [['default', 'axios']], // ✅ Correct way to auto-import axios
        },
      ],
      dts: 'src/auto-imports.d.ts', // Optional: Generates TypeScript definitions
    }),
  ],
})
