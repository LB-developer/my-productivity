/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './Pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './components/Widgets/**/*.{js,jsx,ts,tsx}',
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require('preline/plugin'),
  ],
}
