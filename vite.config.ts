import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import optimizationPersist from 'vite-plugin-optimize-persist';
import pkgConfig from 'vite-plugin-package-config';
import graphql from '@rollup/plugin-graphql';
import eslintPlugin from '@nabla/vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  resolve: {
    alias: {
      // https://github.com/aws-amplify/amplify-ui/issues/268#issuecomment-953375909
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  build: {
    outDir: 'build',
  },
  // @ts-ignore
  test: {
    globals: true,
    testTimeout: 20000,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  server: {
    host: true,
    port: 3000,
  },
  plugins: [
    react(),
    svgr(),
    tsconfigPaths(),
    pkgConfig({
      field: 'vite',
      packageJsonPath: 'vite-deps.json',
    }),
    optimizationPersist(),
    graphql(),
    eslintPlugin({
      eslintOptions: {
        overrideConfigFile: './.eslintrc-ide.json',
      },
    }),
  ],
});
