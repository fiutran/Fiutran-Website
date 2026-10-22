import type { Config } from 'tailwindcss';

// Wireframe palette: white, four greys, black. Nothing else is available on purpose,
// so no brand colour can sneak in before the design phase. Reskin = replace this palette.
const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx,mdx}', './mdx-components.tsx'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#111111',
      g: {
        50: '#f5f5f5',
        100: '#e8e8e8',
        300: '#c4c4c4',
        600: '#595959',
      },
    },
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
    extend: {
      maxWidth: { site: '76rem' },
    },
  },
  plugins: [],
};
export default config;
