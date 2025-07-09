// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Import the specific PostCSS plugin for Tailwind CSS v4.0
import tailwindcss from '@tailwindcss/postcss'; // Correct import for v4.0 PostCSS plugin
import autoprefixer from 'autoprefixer'; // Keep this import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Add other plugins here if you have them
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // Call it as a function
        autoprefixer(), // Call it as a function
      ],
    },
  },
});