/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'slowly-pulse': 'slowly-pulse 15s ease-in-out infinite',
        'fade-in': 'fade-in 1.2s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
        'slide-up-delay-1': 'slide-up 0.8s ease-out 0.2s both',
        'slide-up-delay-2': 'slide-up 0.8s ease-out 0.4s both',
        'slide-up-delay-3': 'slide-up 0.8s ease-out 0.6s both',
        'slide-up-delay-4': 'slide-up 0.8s ease-out 0.8s both',
        'scale-up': 'scale-up 0.3s ease-out',
      },
      keyframes: {
        'slowly-pulse': {
          '0%, 100%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
