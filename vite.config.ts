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
import postcssNested from 'postcss-nested';
import postcssMixins from 'postcss-mixins';
import postcssSimpleVars from 'postcss-simple-vars';
import px2vw from '@our-patches/postcss-px-to-viewport';



export default defineConfig(({ command }: ConfigEnv) => {
  const excludeCssAttributes = [
    '*', '!min-width', '!min-height', '!font-size', '!filter', '!border-radius',
    '!column-gap', '!row-gap'
  ]

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
          find: '@animations',
          replacement: '/src/animations'
        },
        {
          find: '@routes',
          replacement: '/src/routes'
        },
        {
          find: '@GsapNewspaper',
          replacement: '/src/pages/GsapNewspaper'
        },
        {
          find: '@stores',
          replacement: '/src/stores'
        },
        {
          find: '@features',
          replacement: '/src/features'
        },
        {
          find: '@modules',
          replacement: '/src/modules'
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
            react: ['react', 'react-dom', 'styled-components', 'react-router-dom'],
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
          /** 只針對滿版的 style 要轉 viewport, 其他透過 tailwindcss pixel 指定即可 */
          px2vw({
            unitToConvert: 'px', // 要轉化的單位
            viewportWidth: 360, // UI設計稿的寬度
            unitPrecision: 64, // 轉換後的精度，即小數點位數
            propList: excludeCssAttributes, // 指定轉換的css屬性的單位，*代表全部css屬性的單位都進行轉換
            viewportUnit: 'vw', // 指定需要轉換成的視窗單位，默認vw
            fontViewportUnit: 'vw', // 指定字體需要轉換成的視窗單位，默認vw
            selectorBlackList: ['wrap'], // 指定不轉換為視窗單位的類名，
            minPixelValue: 1, // 默認值1，小於或等於4px則不進行轉換
            mediaQuery: true, // 是否在媒體查詢的css代碼中也進行轉換，默認false
            replace: true, // 是否轉換後直接更換屬性值
            include: [
              /\/fullpage\/mobile(\.module)?\.scss/
            ], // 只包含允許的文件
            landscape: false // 是否處理橫屏情況
          }),
          px2vw({
            unitToConvert: 'px', // 要轉化的單位
            viewportWidth: 1280, // UI設計稿的寬度
            unitPrecision: 64, // 轉換後的精度，即小數點位數
            propList: excludeCssAttributes, // 指定轉換的css屬性的單位，*代表全部css屬性的單位都進行轉換
            viewportUnit: 'vw', // 指定需要轉換成的視窗單位，默認vw
            fontViewportUnit: 'vw', // 指定字體需要轉換成的視窗單位，默認vw
            selectorBlackList: ['wrap'], // 指定不轉換為視窗單位的類名，
            minPixelValue: 1, // 默認值1，小於或等於4px則不進行轉換
            mediaQuery: true, // 是否在媒體查詢的css代碼中也進行轉換，默認false
            replace: true, // 是否轉換後直接更換屬性值
            include: [
              /\/fullpage\/pc(\.module)?\.scss/
            ], // 只包含允許的文件
            landscape: false // 是否處理橫屏情況
          }),
          px2vw({
            unitToConvert: 'px', // 要轉化的單位
            viewportWidth: 768, // UI設計稿的寬度
            unitPrecision: 64, // 轉換後的精度，即小數點位數
            propList: excludeCssAttributes, // 指定轉換的css屬性的單位，*代表全部css屬性的單位都進行轉換
            viewportUnit: 'vw', // 指定需要轉換成的視窗單位，默認vw
            fontViewportUnit: 'vw', // 指定字體需要轉換成的視窗單位，默認vw
            selectorBlackList: ['wrap'], // 指定不轉換為視窗單位的類名，
            minPixelValue: 1, // 默認值1，小於或等於4px則不進行轉換
            mediaQuery: true, // 是否在媒體查詢的css代碼中也進行轉換，默認false
            replace: true, // 是否轉換後直接更換屬性值
            include: [
              /\/fullpage\/tablet(\.module)?\.scss/
            ], // 只包含允許的文件
            landscape: false // 是否處理橫屏情況
          }),
        ]
      }
    }
  };
});
