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
// src/themeLoader.js
export function loadThemeStylesheet(themeName) {
  let themeLink = document.getElementById('active-theme-stylesheet');

  if (!themeLink) {
    themeLink = document.createElement('link');
    themeLink.id = 'active-theme-stylesheet';
    themeLink.rel = 'stylesheet';
    document.head.appendChild(themeLink);
  }

  // Points to the Vite build assets
  themeLink.href = `/assets/theme-${themeName}.css`;
}
