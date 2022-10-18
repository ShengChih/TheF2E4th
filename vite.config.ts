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
import px2vw from 'postcss-px-to-viewport'
import px2rem from 'postcss-pxtorem'
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
          px2vw({
            unitToConvert: 'px', // 要轉化的單位
            viewportWidth: 360, // UI設計稿的寬度
            unitPrecision: 6, // 轉換後的精度，即小數點位數
            propList: ['*', '!min-width', '!min-height', '!font-size', '!filter'], // 指定轉換的css屬性的單位，*代表全部css屬性的單位都進行轉換
            viewportUnit: 'vw', // 指定需要轉換成的視窗單位，默認vw
            fontViewportUnit: 'vw', // 指定字體需要轉換成的視窗單位，默認vw
            selectorBlackList: ['wrap'], // 指定不轉換為視窗單位的類名，
            minPixelValue: 1, // 默認值1，小於或等於4px則不進行轉換
            mediaQuery: true, // 是否在媒體查詢的css代碼中也進行轉換，默認false
            replace: true, // 是否轉換後直接更換屬性值
            exclude: [/node_modules/, /pc\.scss/, /tablet\.scss/], // 設置忽略文件，用正則做目錄名匹配
            landscape: false // 是否處理橫屏情況
          }),
          px2vw({
            unitToConvert: 'px', // 要轉化的單位
            viewportWidth: 1280, // UI設計稿的寬度
            unitPrecision: 6, // 轉換後的精度，即小數點位數
            propList: ['*', '!min-width', '!min-height', '!font-size', '!filter'], // 指定轉換的css屬性的單位，*代表全部css屬性的單位都進行轉換
            viewportUnit: 'vw', // 指定需要轉換成的視窗單位，默認vw
            fontViewportUnit: 'vw', // 指定字體需要轉換成的視窗單位，默認vw
            selectorBlackList: ['wrap'], // 指定不轉換為視窗單位的類名，
            minPixelValue: 1, // 默認值1，小於或等於4px則不進行轉換
            mediaQuery: true, // 是否在媒體查詢的css代碼中也進行轉換，默認false
            replace: true, // 是否轉換後直接更換屬性值
            exclude: [/node_modules/, /mobile\.scss/, /tablet\.scss/], // 設置忽略文件，用正則做目錄名匹配
            landscape: false // 是否處理橫屏情況
          }),
          px2vw({
            unitToConvert: 'px', // 要轉化的單位
            viewportWidth: 768, // UI設計稿的寬度
            unitPrecision: 6, // 轉換後的精度，即小數點位數
            propList: ['*', '!min-width', '!min-height', '!font-size', '!filter'], // 指定轉換的css屬性的單位，*代表全部css屬性的單位都進行轉換
            viewportUnit: 'vw', // 指定需要轉換成的視窗單位，默認vw
            fontViewportUnit: 'vw', // 指定字體需要轉換成的視窗單位，默認vw
            selectorBlackList: ['wrap'], // 指定不轉換為視窗單位的類名，
            minPixelValue: 1, // 默認值1，小於或等於4px則不進行轉換
            mediaQuery: true, // 是否在媒體查詢的css代碼中也進行轉換，默認false
            replace: true, // 是否轉換後直接更換屬性值
            exclude: [/node_modules/, /mobile\.scss/, /pc\.scss/], // 設置忽略文件，用正則做目錄名匹配
            landscape: false // 是否處理橫屏情況
          }),
          px2rem({
            rootValue: 16,
            unitPrecision: 6,
            propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 4,
            exclude: /node_modules/
          })
        ]
      }
    }
  };
});
