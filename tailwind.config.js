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
        'dark-bg': '#0D1117',
        'dark-surface': '#161B22',
        'dark-primary': '#58A6FF',
        'dark-secondary': '#58A6FF',
        'dark-success': '#3FB950',
        'dark-warning': '#D29922',
        'dark-error': '#F85149',
        'dark-text-primary': '#C9D1D9',
        'dark-text-secondary': '#8B949E',
        'dark-text-disabled': 'rgba(139, 148, 158, 0.5)',
        'dark-border': '#30363D',
        'dark-code': '#1F2933',
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
              color: theme('colors.dark-primary'),
              backgroundColor: theme('colors.dark-code'),
            },
            pre: {
              backgroundColor: theme('colors.dark-code'),
            },
            strong: {
              color: theme('colors.dark-text-primary'),
            },
            blockquote: {
              color: theme('colors.dark-text-secondary'),
              borderLeftColor: theme('colors.dark-border'),
            },
            hr: {
              borderColor: theme('colors.dark-border'),
            },
            ol: {
              color: theme('colors.dark-text-secondary'),
            },
            ul: {
              color: theme('colors.dark-text-secondary'),
            },
            li: {
              color: theme('colors.dark-text-secondary'),
            },
            th: {
              color: theme('colors.dark-text-primary'),
              borderColor: theme('colors.dark-border'),
            },
            td: {
              borderColor: theme('colors.dark-border'),
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