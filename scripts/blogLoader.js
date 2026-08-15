import { parse } from 'marked';

// Import raw markdown files using Vite glob import
const postFiles = import.meta.glob('/posts/*.md', { query: '?raw', eager: true });

export function getAllPosts() {
  return Object.keys(postFiles).map((filepath) => {
    const rawContent = postFiles[filepath].default;
    const slug = filepath.replace('/posts/', '').replace('.md', '');

    // Extract H1 title before parsing or default to slug name
    const titleMatch = rawContent.match(/^#\s+(.*)$/m);
    const title = titleMatch ? titleMatch[1] : slug;

    // Convert raw Markdown text to HTML
    const htmlContent = parse(rawContent);

    return {
      slug,
      title,
      content: htmlContent,
    };
  });
}
