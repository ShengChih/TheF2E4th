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
      'julian': ['AR JULIAN'],
      'roboto': ['Roboto']
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s linear'
      },
      keyframes: {
        'fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      const fonts = {
        '@font-face': [
          {
            fontFamily: 'Roboto',
            fontWeight: 400,
            src: 'url("./fonts/Roboto/Roboto-Regular.ttf") format("tff");'
          },
          {
            fontFamily: 'Roboto',
            fontWeight: 500,
            src: 'url("./fonts/Roboto/Roboto-Medium.ttf") format("tff");'
          },
          {
            fontFamily: 'Roboto',
            fontWeight: 900,
            src: 'url("./fonts/Roboto/Roboto-Black.ttf") format("tff");'
          },
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
            fontWeight: 500,
            src: 'url("./fonts/Noto_Sans_TC/NotoSansTC-Medium.otf") format("opentype");'
          },
          {
            fontFamily: 'Noto Sans TC',
            fontWeight: 700,
            src: 'url("./fonts/Noto_Sans_TC/NotoSansTC-Bold.otf") format("opentype");'
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
            fontWeight: 500,
            src: 'url("./fonts/Noto_Sans_TC/NotoSerifTC-Medium.otf") format("opentype");'
          },
          {
            fontFamily: 'Noto Serif TC',
            fontWeight: 700,
            src: 'url("./fonts/Noto_Sans_TC/NotoSerifTC-Bold.otf") format("opentype");'
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
