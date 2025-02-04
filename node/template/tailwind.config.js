/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{html,php,vue,js}",
      "./public/index.php"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#161816',
        bgSecond: '#3d6f71',
        div: '#202222',
        mainColor: '#2feff2'
      },
      backgroundImage: {
        'main': "url('@/assets/images/background.png')",
        'main-gradient': 'linear-gradient(to right, #2feff2, #32cacd)'
      }
    },
  },
  plugins: [],
}

