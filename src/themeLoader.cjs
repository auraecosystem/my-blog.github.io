// src/themeLoader.js

const themeModules = {
  default: () => import('@styles/reset.scss'),
  glitch: () => import('@styles/flavours/glitch/reset.scss'),
  win95: () => import('@styles/win95.scss'),
};

export async function setAppTheme(themeName) {
  if (!themeModules[themeName]) {
    console.warn(`Theme "${themeName}" not found. Falling back to default.`);
    themeName = 'default';
  }

  // Dynamically import the chosen SCSS module
  await themeModules[themeName]();
  document.documentElement.setAttribute('data-theme', themeName);
}
