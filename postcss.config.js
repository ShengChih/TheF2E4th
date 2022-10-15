module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 要轉化的單位
      viewportWidth: 1280, // UI設計稿的寬度
      unitPrecision: 6, // 轉換後的精度，即小數點位數
      propList: ['*', '!min-width', '!min-height'], // 指定轉換的css屬性的單位，*代表全部css屬性的單位都進行轉換
      viewportUnit: 'vw', // 指定需要轉換成的視窗單位，默認vw
      fontViewportUnit: 'vw', // 指定字體需要轉換成的視窗單位，默認vw
      selectorBlackList: ['wrap'], // 指定不轉換為視窗單位的類名，
      minPixelValue: 1, // 默認值1，小於或等於4px則不進行轉換
      mediaQuery: false, // 是否在媒體查詢的css代碼中也進行轉換，默認false
      replace: true, // 是否轉換後直接更換屬性值
      exclude: [/node_modules/], // 設置忽略文件，用正則做目錄名匹配
      landscape: false // 是否處理橫屏情況
    },
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 6,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 4,
      exclude: /node_modules/i
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
}