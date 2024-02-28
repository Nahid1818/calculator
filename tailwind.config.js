/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'mobileS': '320px',

      'mobileM': '375px',

      'mobileL': '425px',

      'tablet': '768px',

      'laptop': '1024px',

      'laptopL': '1440px',

      '4k': '2560px',
    },
    extend: {},
  },
  plugins: [],
}