// src/main.js
import { setAppTheme } from './themeLoader';
import { getAllPosts } from './scripts/blogLoader';
import { setAppTheme } from './scripts/themeLoader';

// Initialize Theme (Default, Win95, or Glitch)
const activeTheme = localStorage.getItem('blog-theme') || 'win95';
setAppTheme(activeTheme);

// Render Blog Posts into HTML
const posts = getAllPosts();
const appContainer = document.getElementById('app');

appContainer.innerHTML = `
  <header class="title-bar">
    <h1>My Tech Blog</h1>
    <div class="theme-selector">
      <button onclick="changeTheme('default')">Default</button>
      <button onclick="changeTheme('glitch')">Glitch</button>
      <button onclick="changeTheme('win95')">Win95</button>
    </div>
  </header>

  <main class="window">
    ${posts.map(post => `
      <article class="post-card">
        <h2>${post.title}</h2>
        <div class="post-content">${post.content}</div>
      </article>
    `).join('')}
  </main>
`;

// Expose theme change handler globally
window.changeTheme = (themeName) => {
  localStorage.setItem('blog-theme', themeName);
  setAppTheme(themeName);
};
// Read saved preference or default to win95
const currentTheme = localStorage.getItem('user-theme') || 'win95';
setAppTheme(currentTheme);
