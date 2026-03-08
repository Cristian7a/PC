import { definePreset } from '@primeuix/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fbf8ed',
      100: '#f5efd3',
      200: '#ebdc7a',
      300: '#e2c87d',
      400: '#dab95d',
      500: '#e5c76b', // Dorado Plato y Copa
      600: '#b79f56',
      700: '#897740',
      800: '#5c502b',
      900: '#2e2815',
      950: '#17140b',
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          // Borde de Card de Reseñas (Neutral 800)
          700: '#262626',
          // Fondo de Card de Reseñas (Neutral 950 + Toque Dorado 900)
          800: '#0c0c0c',
          900: '#080808',
          950: '#000000', // Fondo absoluto
        },
        text: {
          color: '{surface.0}', // Blanco puro para máximo contraste
          hoverColor: '{surface.50}',
        },
      },
      light: {
        surface: {
          0: '#ffffff',
          // Fondo matizado de Card de Reseñas (Primary 50/100)
          50: '#fcfaf2',
          100: '#f7f2de',
          // Borde de Card de Reseñas (Gray 200)
          200: '#e5e7eb',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#27272a', // Oscurecido para mayor legibilidad
          800: '#18181b',
          900: '#09090b', // Casi negro puro
          950: '#000000',
        },
        text: {
          color: '{surface.900}', // Forzamos un texto súper oscuro de base
          hoverColor: '{surface.950}',
        },
      },
    },
  },
});

export default MyPreset;
