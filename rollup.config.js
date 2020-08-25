import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const format = process.env.BUILD_FORMAT;

const fileName = ((format) => {
  switch (format) {
    case 'cjs':
      return 'index.common.js';
    case 'umd':
      return 'index.umd.js';
  }
})(format);

export default {
  input: './src/index.ts',
  output: {
    name: `bundle.${format}.js`,
    file: `dist/${fileName}`,
    format,
  },

  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
    terser(),
  ],
};
