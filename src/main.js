// src/main.js
import { setAppTheme } from './themeLoader';

// Read saved preference or default to win95
const currentTheme = localStorage.getItem('user-theme') || 'win95';
setAppTheme(currentTheme);
