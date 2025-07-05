/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  darkMode: 'class', // optional
  theme: {
    extend: {
      colors: {
        primary: '#2E1065',
        secondary: '#FACC15',
        'secondary-hover': '#EAB308',
        accent: '#F472B6',
        background: '#FFFFFF',
        foreground: '#0F172A',
        muted: '#E5E7EB',
        border: '#E5E7EB',
        destructive: '#DC2626',
      },
    },
  },
  plugins: [],
};
