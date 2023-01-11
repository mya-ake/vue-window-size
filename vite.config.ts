/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

const root = process.cwd();

export default defineConfig({
  plugins: [vue(), tsconfigPaths()],
  build: {
    lib: {
      entry: resolve(root, 'src/index.ts'),
      name: 'vue-window-size',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
