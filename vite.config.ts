import { defineConfig } from 'vite';
//@ts-ignore
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: ['docketu.iutnc.univ-lorraine.fr'],
  },
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
