import { parse } from 'marked';
import matter from 'gray-matter';
import hljs from 'highlight.js';

// Configure marked with highlight.js syntax highlighting
const renderer = {
  code(code, infostring) {
    const validLanguage = hljs.getLanguage(infostring) ? infostring : 'plaintext';
    const highlighted = hljs.highlight(code, { language: validLanguage }).value;
    return `
      <div class="code-block-wrapper">
        <div class="code-header">
          <span class="code-lang">${validLanguage}</span>
          <button class="copy-btn" onclick="navigator.clipboard.writeText(\`${code.replace(/`/g, '\\`')}\`)">Copy</button>
        </div>
        <pre><code class="hljs language-${validLanguage}">${highlighted}</code></pre>
      </div>
    `;
  }
};

// Apply custom renderer to marked
parse.use({ renderer });

// Vite raw glob import for all post files
const postFiles = import.meta.glob('/posts/*.md', { query: '?raw', eager: true });

export function getAllPosts() {
  const posts = Object.keys(postFiles).map((filepath) => {
    const rawFileContent = postFiles[filepath].default;
    const slug = filepath.replace('/posts/', '').replace('.md', '');

    // Extract frontmatter metadata and raw markdown body
    const { data: metadata, content: markdownBody } = matter(rawFileContent);

    // Compute estimated reading time
    const wordCount = markdownBody.split(/\s+/g).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Convert markdown body to HTML
    const htmlContent = parse(markdownBody);

    return {
      slug,
      title: metadata.title || slug,
      date: metadata.date ? new Date(metadata.date).toISOString().split('T')[0] : 'Undated',
      tags: metadata.tags || [],
      draft: metadata.draft || false,
      excerpt: metadata.excerpt || markdownBody.slice(0, 150) + '...',
      readingTime: `${readingTime} min read`,
      content: htmlContent,
    };
  });

  // Filter out drafts in production and sort by date descending
  return posts
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return getAllPosts().find(post => post.slug === slug);
}
