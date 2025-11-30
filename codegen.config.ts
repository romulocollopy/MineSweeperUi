import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/__generated__/': {
      preset: 'relay',
      presetConfig: {
        artifactDirectory: './src/__generated__',
      },
      plugins: [],
    },
  },
};

export default config;
