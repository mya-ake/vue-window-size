import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/option-api.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
});
