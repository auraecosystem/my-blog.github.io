import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Uses the modern Sass JS API compiler
        api: 'modern-compiler',
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Multi-theme entries: Compiles each theme into its own CSS bundle
        'theme-default': resolve(__dirname, 'src/styles/reset.scss'),
        'theme-win95': resolve(__dirname, 'src/styles/win95.scss'),
        'flavour-glitch': resolve(__dirname, 'src/styles/flavours/glitch/reset.scss'),
      },
      output: {
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
