import { defineConfig } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    RubyPlugin(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app/javascript'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Modern Sass API configuration
        api: 'modern-compiler',
        includePaths: [resolve(__dirname, 'app/javascript')],
      },
    },
  },
});
