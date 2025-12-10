const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: 
    {
      colors: {
        primary: 'var(--p-primary-500)',
        'primary-contrast': 'var(--p-primary-contrast-color)',
      }
    },
  },
  plugins: [],
};
