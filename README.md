# Cendekia Blog

A developer's journal documenting the process of building projects from scratch, sharing technical challenges, and tracking progress through a visual timeline.

## Project Overview

This site is built using Jekyll and hosted on GitHub Pages with a custom domain (cendekiapp.com). It features:

- Project portfolio with detailed timelines
- Blog posts documenting the development process
- Technical challenge write-ups with solutions
- Dark mode minimalist design using Tailwind CSS

## Development Setup

### Prerequisites

- Ruby version 2.7.0 or higher
- Bundler gem
- Node.js and npm (for Tailwind CSS)

### Installation

1. Clone this repository
   ```
   git clone https://github.com/yourusername/cendekiapp.com.git
   cd cendekiapp.com
   ```

2. Install Ruby dependencies
   ```
   bundle install
   ```

3. Install Node.js dependencies (when Tailwind CSS is added)
   ```
   npm install
   ```

4. Start the development server
   ```
   bundle exec jekyll serve
   ```

5. View the site at [http://localhost:4000](http://localhost:4000)

## Project Structure

- `_config.yml`: Site configuration
- `_layouts/`: Template layouts
- `_includes/`: Reusable components
- `_posts/`: Blog posts
- `_projects/`: Project data files
- `assets/`: CSS, JavaScript, and images

## Deployment

The site is automatically deployed via GitHub Pages when changes are pushed to the main branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 