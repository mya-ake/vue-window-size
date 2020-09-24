import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const createFileName = ({ name, format }) => {
  switch (format) {
    case 'cjs':
      return `${name}.common.js`;
    case 'umd':
      return `${name}.umd.js`;
  }
};

const entries = {
  'index-cjs': {
    name: 'index',
    format: 'cjs',
  },
  'index-umd': {
    name: 'index',
    format: 'umd',
  },
  'option-api-cjs': {
    name: 'option-api',
    format: 'cjs',
  },
  'option-api-umd': {
    name: 'option-api',
    format: 'umd',
  },
};

const createBuildConfig = ({ name, format }) => {
  return {
    input: `./src/${name}.ts`,
    output: {
      name: `bundle.${name}.${format}.js`,
      file: `dist/${createFileName({ name, format })}`,
      format,
    },

    plugins: [
      typescript({
        tsconfig: 'tsconfig.build.json',
      }),
      terser(),
    ],
  };
};

const createBuildConfigs = () => {
  return Object.values(entries).map(createBuildConfig);
};

export default createBuildConfigs();
