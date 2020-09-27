import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

const createFileName = ({ name, format }) => {
  switch (format) {
    case 'cjs':
      return `${name}.js`;
  }
};

const entries = {
  'index-cjs': {
    name: 'index',
    format: 'cjs',
  },
  'option-api-cjs': {
    name: 'option-api',
    format: 'cjs',
  },
};

const createBuildConfig = ({ name, format }) => {
  const jsBuildConfig = {
    input: `./src/${name}.ts`,
    output: {
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

  const dtsBuildConfig = {
    input: `./src/${name}.ts`,
    output: {
      file: `${name}.d.ts`,
      format: 'es',
    },
    plugins: [dts()],
  };

  return [jsBuildConfig, dtsBuildConfig];
};

const createBuildConfigs = () => {
  return Object.values(entries).map(createBuildConfig);
};

export default createBuildConfigs().flat();
