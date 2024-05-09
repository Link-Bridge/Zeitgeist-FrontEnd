/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lighterGray: '#BDBDBD',
        lightGray: '#929292',
        gray: '#686868',
        darkGray: '#515151',
        darkerGray: '#424242',
        darkestGray: '#313131',
        lightGold: '#E8C273',
        gold: '#C29A51',
        darkGold: '#9C844C',
        darkerGold: '#876F39',
        lightSuccess: '#B7D7A8',
        success: '#FFFFFF',
        warning: '#FFE598',
        danger: '#FF7A7A',
        purple: '#D7B2F0',
        darkPurple: '#764D91',
        blue: '#A0C5E8',
        darkBlue: '#878FD2',
        darkerBlue: '#273086',
        cardBg: '#FAFAFA',
      },
      fontFamily: {
        montserrat: ['montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
