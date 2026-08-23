/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F4EA',
        ink: {
          DEFAULT: '#132A1D',
          800: '#1A3525',
          700: '#1E3E2A',
          600: '#2A5238',
        },
        brand: {
          DEFAULT: '#6D4CF2',
          50: '#F0EDFE',
          100: '#E4DEFE',
          200: '#C9BCFD',
          400: '#9D82F7',
          600: '#5B3CD6',
          700: '#4A2DBA',
          900: '#2C1875',
        },
        coral: {
          DEFAULT: '#FF6472',
          50: '#FFF0F1',
          100: '#FFDCE0',
          600: '#E5505E',
          700: '#C03D4A',
        },
        lemon: {
          DEFAULT: '#F4C430',
          50: '#FFFBEB',
          100: '#FEF3C7',
          600: '#D97706',
          700: '#B45309',
        },
        sage: {
          DEFAULT: '#22C55E',
          50: '#F0FDF4',
          100: '#DCFCE7',
          600: '#16A34A',
          700: '#15803D',
        },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out both',
        'slide-up': 'slideUp 0.8s ease-out both',
        'slide-right': 'slideRight 0.8s ease-out both',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(36px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-36px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(109,76,242,0.25)' },
          '50%': { boxShadow: '0 0 60px rgba(109,76,242,0.55)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
