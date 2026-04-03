/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#1A1A1A',
        cream: '#F5F1E8',
        gold: {
          DEFAULT: '#D4A574',
          light: '#E8C9A8',
          dark: '#B8864E',
        },
        'barber-red': {
          DEFAULT: '#B8312F',
          light: '#D44240',
          dark: '#8C2220',
        },
        'warm-gray': {
          DEFAULT: '#6B6B6B',
          light: '#8A8A8A',
          dark: '#4A4A4A',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'glow-gold': '0 0 20px rgba(212, 165, 116, 0.3)',
      },
      animation: {
        kenburns: 'kenburns 25s ease-in-out infinite alternate',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
      },
    },
  },
  plugins: [],
};
