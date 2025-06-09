import { defineConfig } from 'vite';
//@ts-ignore
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  // root: './src',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.hbs'],
});
