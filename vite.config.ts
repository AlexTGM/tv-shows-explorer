import netlify from '@netlify/vite-plugin-tanstack-start'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    // Edge Functions emulation needs Netlify's bundled Deno, which crashes `pnpm dev`
    // ("unexpected argument '--allow-scripts'"). The app has no edge functions.
    netlify({ dev: { edgeFunctions: { enabled: false } } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
