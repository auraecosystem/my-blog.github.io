import { getAllPosts } from './scripts/blogLoader';
import { setAppTheme } from './scripts/themeLoader';

// Load saved theme preference (defaulting to win95)
const activeTheme = localStorage.getItem('blog-theme') || 'win95';
setAppTheme(activeTheme);

// Load and render posts
const posts = getAllPosts();
const appContainer = document.getElementById('app');

appContainer.innerHTML = `
  <header class="title-bar">
    <h1>Dev & Architecture Blog</h1>
    <div class="theme-selector">
      <button onclick="changeTheme('default')">Default</button>
      <button onclick="changeTheme('glitch')">Glitch</button>
      <button onclick="changeTheme('win95')">Win95</button>
    </div>
  </header>

  <main class="window">
    ${posts.map(post => `
      <article class="card post-card">
        <div class="post-content">${post.content}</div>
      </article>
    `).join('')}
  </main>
`;

// Expose theme switcher function globally for inline button triggers
window.changeTheme = (themeName) => {
  localStorage.setItem('blog-theme', themeName);
  setAppTheme(themeName);
};
