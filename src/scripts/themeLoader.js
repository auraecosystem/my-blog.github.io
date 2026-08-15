const themeModules = {
  default: () => import('@styles/reset.scss'),
  glitch: () => import('@styles/flavours/glitch/reset.scss'),
  win95: () => import('@styles/win95.scss'),
};

export async function setAppTheme(themeName) {
  if (!themeModules[themeName]) themeName = 'default';
  
  await themeModules[themeName]();
  document.documentElement.setAttribute('data-theme', themeName);
}
