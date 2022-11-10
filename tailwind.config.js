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
      sm: '375px',
      md: {'min': '768px', 'max': '1280px'},
      xl: '1280px',
    },
    fontFamily: {
      'sans': ['Noto Sans TC', ],
      'serif': ['Noto Serif TC'],
      'julian': ['AR JULIAN'],
      'roboto': ['Roboto'],
      'ebgaramond': ['EB Garamond']
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s linear',
        'swipe-up-infinite': 'swipeUp 1.5s infinite'
      },
      keyframes: {
        'fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'swipeUp': {
          '0%': { translateY: '100%' },
          '100%' : { translateY: '0%' },
        }
      }
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      const fonts = {
        '@font-face': [
          {
            fontFamily: 'EB Garamond',
            fontWeight: 800,
            src: 'url("./fonts/EBGaramond/small-EBGaramond-Bold.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Roboto',
            fontWeight: 400,
            src: 'url("./fonts/Roboto/small-Roboto-Regular.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Roboto',
            fontWeight: 500,
            src: 'url("./fonts/Roboto/small-Roboto-Medium.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Roboto',
            fontWeight: 700,
            src: 'url("./fonts/Roboto/small-Roboto-Bold.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Roboto',
            fontWeight: 900,
            src: 'url("./fonts/Roboto/small-Roboto-Black.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'AR JULIAN',
            fontWeight: 400,
            src: 'url("./fonts/small-ar-julian.woff") format("woff");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Noto Sans TC',
            fontWeight: 400,
            src: 'url("./fonts/Noto_Sans_TC/small-NotoSansTC-Regular.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Noto Sans TC',
            fontWeight: 500,
            src: 'url("./fonts/Noto_Sans_TC/small-NotoSansTC-Medium.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Noto Sans TC',
            fontWeight: 700,
            src: 'url("./fonts/Noto_Sans_TC/small-NotoSansTC-Bold.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Noto Sans TC',
            fontWeight: 900,
            src: 'url("./fonts/Noto_Sans_TC/small-NotoSansTC-Black.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Noto Serif TC',
            fontWeight: 400,
            src: 'url("./fonts/Noto_Serif_TC/small-NotoSerifTC-Regular.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Noto Serif TC',
            fontWeight: 500,
            src: 'url("./fonts/Noto_Sans_TC/small-NotoSerifTC-Medium.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Noto Serif TC',
            fontWeight: 700,
            src: 'url("./fonts/Noto_Sans_TC/small-NotoSerifTC-Bold.otf") format("opentype");',
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'Noto Serif TC',
            fontWeight: 900,
            src: 'url("./fonts/Noto_Serif_TC/small-NotoSerifTC-Black.otf") format("opentype");',
            fontDisplay: 'swap',
          }
        ]
      }
      addBase(fonts)
    })
  ],
}
