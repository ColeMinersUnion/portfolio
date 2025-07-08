import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/onnxruntime-web/dist/*',
          dest: '' // Copy to the root of the dist folder 
        }
      ]
    })
  ],
  optimizeDeps: {
    exclude: ['onnxruntime-web'] // Exclude onnxruntime-web from dependency optimization
  },
})
