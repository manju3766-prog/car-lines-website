/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#060910',
          900: '#090D16', // Main background
          800: '#0F172A', // Secondary background
          700: '#111827', // Card background
          600: '#1E293B',
          500: '#334155',
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B', // Primary Gold
          600: '#D97706', // Gold hover
          700: '#B45309',
        },
        whatsapp: {
          500: '#10B981',
          600: '#059669',
        },
        promo: {
          pink: '#EC4899',
          'pink-hover': '#DB2777',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
        'obsidian-card': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
}
