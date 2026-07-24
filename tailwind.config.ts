import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Fuentes
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        display: ['Segoe UI', 'system-ui', 'sans-serif'],
      },

      // Sistema de tipografía
      fontSize: {
        'xs': ['12px', { lineHeight: '1.5' }],
        'sm': ['13px', { lineHeight: '1.6' }],
        'base': ['14px', { lineHeight: '1.6' }],
        'lg': ['16px', { lineHeight: '1.6' }],
        'xl': ['20px', { lineHeight: '1.6' }],
        '2xl': ['24px', { lineHeight: '1.3' }],
        '3xl': ['28px', { lineHeight: '1.3' }],
        '4xl': ['32px', { lineHeight: '1.2' }],
      },

      // Tamaños personalizados
      width: {
        '70.5': '282px',
      },
      minWidth: {
        '70.5': '282px',
      },

      // Espaciado personalizado
      spacing: {
        '70.5': '282px',
      },

      // Bordes
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '4': '4px',
      },


      // Radio de bordes
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },

      // Transiciones
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },

      // Z-index
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'auto': 'auto',
      },
    },
  },
  plugins: [],
} satisfies Config;
