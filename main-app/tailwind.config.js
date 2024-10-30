/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6A00FF',
        background: '#F5F5F7',
        content: '#FFFFFF',
        title: '#333333',
        subtitle: '#666666',
        description: '#999999',
      },
      fontSize: {
        'title': '20px',
        'subtitle': '16px',
        'normal': '14px',
        'small': '12px',
      },
      spacing: {
        'header': '64px',
        'search': '40px',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
} 