// @ts-nocheck
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/**/*.html',
    './_posts/**/*.md',
    './_projects/**/*.html',
    './_projects/**/*.md',
    './assets/js/**/*.js',
    './*.html',
    './*.md'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'dark-surface': '#1E1E1E',
        'dark-primary': '#BB86FC',
        'dark-secondary': '#03DAC6',
        'dark-error': '#CF6679',
        'dark-text-primary': '#FFFFFF',
        'dark-text-secondary': 'rgba(255, 255, 255, 0.7)',
        'dark-text-disabled': 'rgba(255, 255, 255, 0.5)',
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.dark-text-primary'),
            h1: {
              color: theme('colors.dark-text-primary'),
            },
            h2: {
              color: theme('colors.dark-text-primary'),
            },
            h3: {
              color: theme('colors.dark-text-primary'),
            },
            h4: {
              color: theme('colors.dark-text-primary'),
            },
            p: {
              color: theme('colors.dark-text-secondary'),
            },
            a: {
              color: theme('colors.dark-primary'),
            },
            code: {
              color: theme('colors.dark-secondary'),
            },
            pre: {
              backgroundColor: theme('colors.dark-surface'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 