module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkmode: 'class', // or 'media' or 'class
  theme: {
    colors: {
      red: '#ff4949',
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
      white: '#ffffff',
      black: '#000000',
      toast: '#425776',
      'main-blue': '#056BF1',
      'main-text': '#353535',
      'point-yellow': '#FFB120',
      unactivated: '#B9B9B9',
      gray1: '#353535',
      gray2: '#5F5F5F',
      alert: '#FF5151',
      'back-line': '#E3E3E3',
      'back-color': '#F2F3F8',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      spoqa: ['Spoqa Han Sans Neo', 'sans-serif'],
      jalnan: ['jalnan'],
    },
    dropShadow: {
      main: '2px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    height: {
      screen: '100dvh',
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'bounce-scale': 'bounce-scale 1s infinite',
      },
      keyframes: {
        'bounce-scale': {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            scale: '1.3',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'translateY(0)',
            scale: '1.3',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
    },
  },
};
