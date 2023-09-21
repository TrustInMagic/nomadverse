import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        'fit-content': 'fit-content',
      },
      screens: {
        'max-850': { max: '850px' },
        'max-1000': { max: '1000px' },
        'max-720': { max: '720px' },
        'max-550': { max: '550px' },
        'min-720': { min: '720px' },
        'max-460': { max: '460px' },
        'max-300': { max: '300px' },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
export default config;
