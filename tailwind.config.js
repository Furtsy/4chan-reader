/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          dark: {
            DEFAULT: '#201F20',
          },
        },
      },
    },
    plugins: [],
  }