/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Manrope', 'sans-serif'],
        marathi: ['Mukta', 'Manrope', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: '#1E3A8A',
          blue: '#2563EB',
          pink: '#DB2777',
          purple: '#9333EA',
          dark: '#0F172A',
          slate: '#0F1D4E',
        },
      },
    },
  },
  plugins: [],
};
