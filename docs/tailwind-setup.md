# Tailwind CSS Setup for Cendekia Blog

This document explains how Tailwind CSS is integrated with the Jekyll site and how to use it.

## Installation

The project uses Tailwind CSS for styling with a dark mode only theme. The necessary files are:

- `tailwind.config.js`: Configuration for Tailwind, including the dark mode theme colors
- `postcss.config.js`: PostCSS configuration for processing Tailwind
- `assets/css/main.scss`: Main stylesheet with Tailwind imports and custom styles

## Development

To work with the project and have Tailwind CSS processing:

1. Install Node.js dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

   This command will:
   - Watch for changes in your Tailwind CSS file
   - Process the CSS
   - Start the Jekyll server

## Usage

### Using Tailwind Classes

You can use Tailwind utility classes directly in your HTML:

```html
<div class="bg-dark-surface p-4 rounded-lg">
  <h2 class="text-xl text-dark-primary mb-2">Title</h2>
  <p class="text-dark-text-secondary">Content goes here</p>
</div>
```

### Custom Colors

The theme extends Tailwind with custom dark mode colors:

- `dark-bg`: Main background color (#121212)
- `dark-surface`: Component background color (#1E1E1E)
- `dark-primary`: Primary accent color (#BB86FC)
- `dark-secondary`: Secondary accent color (#03DAC6)
- `dark-error`: Error color (#CF6679)
- `dark-text-primary`: Primary text color (white)
- `dark-text-secondary`: Secondary text color (70% white)
- `dark-text-disabled`: Disabled text color (50% white)

### Component Examples

Check the `_includes/components/` directory for reusable UI components built with Tailwind CSS.

## Build for Production

For production builds, run:

```
npm run build:tailwind
bundle exec jekyll build
```

This will generate the optimized CSS file before building the Jekyll site. 