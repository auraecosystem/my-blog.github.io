import { getAllPosts, getPostBySlug } from './scripts/blogLoader';
import { setAppTheme } from './scripts/themeLoader';

// Initialize persistent theme preference
const activeTheme = localStorage.getItem('blog-theme') || 'win95';
setAppTheme(activeTheme);

// Global theme toggle handler
window.changeTheme = (themeName) => {
  localStorage.setItem('blog-theme', themeName);
  setAppTheme(themeName);
};

// Router component
function renderApp() {
  const appContainer = document.getElementById('app');
  const hash = window.location.hash;

  // Single Post Route: #/post/:slug
  if (hash.startsWith('#/post/')) {
    const slug = hash.replace('#/post/', '');
    const post = getPostBySlug(slug);

    if (!post) {
      appContainer.innerHTML = `
        <div class="window error-window">
          <h2>404 - Post Not Found</h2>
          <p>The requested article does not exist or has been moved.</p>
          <a href="#/" class="btn">Return to Index</a>
        </div>
      `;
      return;
    }

    appContainer.innerHTML = `
      <header class="title-bar">
        <a href="#/" class="btn back-btn">&larr; Back to Index</a>
        <div class="theme-selector">
          <button onclick="changeTheme('default')">Default</button>
          <button onclick="changeTheme('glitch')">Glitch</button>
          <button onclick="changeTheme('win95')">Win95</button>
        </div>
      </header>

      <main class="window post-view">
        <article class="card">
          <header class="post-header">
            <h1>${post.title}</h1>
            <div class="post-meta">
              <span>Published: ${post.date}</span> | 
              <span>${post.readingTime}</span>
              ${post.tags.length ? `| <span class="tags">${post.tags.map(t => `#${t}`).join(' ')}</span>` : ''}
            </div>
          </header>
          <hr />
          <div class="post-content">${post.content}</div>
        </article>
      </main>
    `;
    return;
  }

  // Home Route: #/ or empty
  const posts = getAllPosts();
  appContainer.innerHTML = `
    <header class="title-bar">
      <h1>Technical Engineering & Architecture Log</h1>
      <div class="theme-selector">
        <button onclick="changeTheme('default')">Default</button>
        <button onclick="changeTheme('glitch')">Glitch</button>
        <button onclick="changeTheme('win95')">Win95</button>
      </div>
    </header>

    <main class="window index-view">
      <section class="post-list">
        ${posts.map(post => `
          <article class="card post-summary-card">
            <h2><a href="#/post/${post.slug}">${post.title}</a></h2>
            <div class="post-meta">
              <span>${post.date}</span> &bull; <span>${post.readingTime}</span>
            </div>
            <p class="excerpt">${post.excerpt}</p>
            <a href="#/post/${post.slug}" class="btn read-more">Read Article &rarr;</a>
          </article>
        `).join('')}
      </section>
    </main>
  `;
}

// Listen for route changes
window.addEventListener('hashchange', renderApp);
window.addEventListener('DOMContentLoaded', renderApp);
