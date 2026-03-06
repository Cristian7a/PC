// client/src/app/mypreset.ts
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
          700: '#3f3f46',
          800: '#18181b', // Color para elevaciones (Cards/Inputs)
          900: '#0c0c0c', // Color para secciones secundarias
          950: '#000000', // FONDO PRINCIPAL ABSOLUTO
        },
      },
      light: {
        surface: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#000000',
        },
      },
    },
  },
});

export default MyPreset;
