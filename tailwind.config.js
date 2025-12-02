/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './app/root.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#245949',
          accent: '#16322C',
          bg: '#FAF7F0',
          text: '#16322C',
        },
      },
      fontFamily: {
        sans: ['"Outfit"', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        md: '4px',
      },
      spacing: {
        1: '4px',
      },
      fontSize: {
        h1: ['96px', {lineHeight: '1.05', letterSpacing: '-0.02em'}],
        h2: ['48px', {lineHeight: '1.1', letterSpacing: '-0.01em'}],
        body: ['18px', {lineHeight: '1.6'}],
      },
      boxShadow: {
        subtle: '0 20px 40px rgba(22, 50, 44, 0.12)',
      },
    },
  },
  plugins: [],
};
