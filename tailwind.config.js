/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:     '#F7F2E8',
        paper:     '#EDE5D0',
        parchment: '#DDD0B0',
        sepia:     '#8B6914',
        'sepia-light': '#B8922A',
        amber:     '#D4890A',
        'amber-dark': '#A3660A',
        ink:       '#1E130A',
        'ink-soft': '#3D2B1A',
        'ink-muted':'#6B4E35',
        'green-moss': '#4A6741',
        'green-light': '#6B8F5E',
        rust:      '#A63D2F',
        'rust-light': '#C4553D',
        gold:      '#C9A84C',
      },
      fontFamily: {
        display:  ['"Playfair Display"', 'Georgia', 'serif'],
        body:     ['"Crimson Pro"', 'Georgia', 'serif'],
        accent:   ['"IM Fell English"', 'Georgia', 'serif'],
        sans:     ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'train-move':    'trainMove 18s linear infinite',
        'smoke-rise':    'smokeRise 2s ease-out infinite',
        'float-up':      'floatUp 0.6s ease-out forwards',
        'fade-in':       'fadeIn 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
        'shimmer':       'shimmer 2s ease-in-out infinite',
        'pulse-soft':    'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        trainMove: {
          '0%':   { transform: 'translateX(-220px)' },
          '100%': { transform: 'translateX(110vw)' },
        },
        smokeRise: {
          '0%':   { opacity: '0.8', transform: 'translateY(0) scale(0.5)' },
          '100%': { opacity: '0',   transform: 'translateY(-40px) scale(1.8)' },
        },
        floatUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
