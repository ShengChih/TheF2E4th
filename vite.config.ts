/* eslint-disable no-extra-boolean-cast */
import { defineConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';

import { viteMockServe } from 'vite-plugin-mock';
import { visualizer } from 'rollup-plugin-visualizer';

import path from 'path';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import tailwindcssNesting from 'tailwindcss/nesting';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested'
import postcssMixins from 'postcss-mixins'
import postcssSimpleVars from 'postcss-simple-vars';


export default defineConfig(({ command }: ConfigEnv) => {
  return {
    base: './',
    plugins: [
      react(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: !!process.env.USE_MOCK,
        prodEnabled: !!process.env.USE_CHUNK_MOCK,
        logger: false,
        supportTs: true
      }),
      !!process.env.REPORT
        ? visualizer({
          open: true,
          gzipSize: true,
          filename: path.resolve(__dirname, 'dist/stats.html')
        })
        : null
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src'
        },
        {
          find: '@assets',
          replacement: '/src/assets'
        },
        {
          find: '@components',
          replacement: '/src/components'
        },
        {
          find: '@pages',
          replacement: '/src/pages'
        },
        {
          find: '@utils',
          replacement: '/src/utils'
        },
        {
          find: '@hooks',
          replacement: '/src/hooks'
        },
        {
          find: '@HOCs',
          replacement: '/src/HOCs'
        },
        {
          find: '@layouts',
          replacement: '/src/layouts'
        },
        {
          find: '@api',
          replacement: '/src/api'
        },
        {
          find: '@images',
          replacement: '/src/images'
        }
      ]
    },
    server: {
      https: false,
      open: false,
      port: 3000,
      host: "0.0.0.0",
      hmr: {
        overlay: true,
      }
    },
    optimizeDeps: {
      include: []
    },
    build: {
      terserOptions: {
        compress: {
          // drop_console: true,
          // drop_debugger: true,
        }
      },
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'styled-components'],
          }
        }
      }
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'grouped',
            Once(root, { result }) {
              return postcss([
                postcssImport,
                postcssMixins,
                postcssSimpleVars
              ]).process(root, result.opts)
            },
          },
          tailwindcssNesting(postcssNested),
          tailwindcss,
          autoprefixer,
        ]
      }
    }
  };
});
