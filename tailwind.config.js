/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'spin-reverse': 'spin 1s linear infinite reverse',
        'shimmer': 'shimmer 1s infinite linear',
        'fly-right-top': 'fly-right-top 1s linear infinite',
        'fly-right-btm': 'fly-right-btm 1s linear infinite',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'fly-right-top': {
           '0%': { transform: 'translate(0, 0) scale(1)', opacity: 1 },
           '100%': { transform: 'translate(300px, -80px) scale(0.5)', opacity: 0 }
        },
        'fly-right-btm': {
           '0%': { transform: 'translate(0, 0) scale(1)', opacity: 1 },
           '100%': { transform: 'translate(300px, 80px) scale(0.5)', opacity: 0 }
        }
      }
    },
  },
  plugins: [],
}
