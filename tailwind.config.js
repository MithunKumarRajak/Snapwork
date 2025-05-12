/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",  // If you are using the `app` directory in Next.js 13+ for the App Router
  ],
  darkMode: 'media', // You can also use 'class' for manual dark mode control
  theme: {
    extend: {},
  },
  plugins: [],
}
