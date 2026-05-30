import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand': {
          'bg': '#0B2018',
          'surface': '#1A4231',
          'border': '#2E4A3A',
          'gold': '#C9A84C',
          'gold-light': '#E8C96E',
          'emerald': '#52B788',
          'text-primary': '#F5F0E8',
          'text-muted': '#C8C0B0',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', ...defaultTheme.fontFamily.serif],
        'serif': ['Cormorant Garamond', ...defaultTheme.fontFamily.serif],
        'mono': ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        'gutter': '24px',
        'section': '80px',
        'section-lg': '120px',
      },
      borderRadius: {
        'card': '8px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.35)',
        'card-hover': '0 12px 48px rgba(0, 0, 0, 0.5)',
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '400ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
