/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
      },
      colors: {
        crimson: {
          DEFAULT: '#DC143C',
          dark: '#A91B0D',
          light: '#E63946',
        },
        ink: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#cccccc',
          300: '#999999',
          400: '#666666',
          500: '#3d3d3d',
          600: '#2d2d2d',
          700: '#1a1a1a',
          800: '#0d0d0d',
          900: '#000000',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
}
