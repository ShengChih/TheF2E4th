const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      'mobile': '375px',
      'tablet': '768px',
      'desktop': '1280px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      'sans': ['Noto Sans TC', ],
      'serif': ['Noto Serif TC'],
      'julian': ['AR JULIAN']
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase }) {
      const fonts = {
        '@font-face': [
          {
            fontFamily: 'AR JULIAN',
            fontWeight: 400,
            src: 'url("./fonts/ar-julian.woff") format("woff");'
          },
          {
            fontFamily: 'Noto Sans TC',
            fontWeight: 400,
            src: 'url("./fonts/Noto_Sans_TC/NotoSansTC-Regular.otf") format("opentype");'
          },
          {
            fontFamily: 'Noto Sans TC',
            fontWeight: 900,
            src: 'url("./fonts/Noto_Sans_TC/NotoSansTC-Black.otf") format("opentype");'
          },
          {
            fontFamily: 'Noto Serif TC',
            fontWeight: 400,
            src: 'url("./fonts/Noto_Serif_TC/NotoSerifTC-Regular.otf") format("opentype");'
          },
          {
            fontFamily: 'Noto Serif TC',
            fontWeight: 900,
            src: 'url("./fonts/Noto_Serif_TC/NotoSerifTC-Black.otf") format("opentype");'
          }
        ]
      }
      addBase(fonts)
    })
  ],
}
