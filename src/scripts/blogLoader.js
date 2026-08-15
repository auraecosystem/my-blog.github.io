// Automatically imports all markdown posts from /posts
const postFiles = import.meta.glob('/posts/*.md', { query: '?raw', eager: true });

export function getAllPosts() {
  return Object.keys(postFiles).map((filepath) => {
    const rawContent = postFiles[filepath].default;
    const slug = filepath.replace('/posts/', '').replace('.md', '');

    // Extract basic title from first H1 or use slug
    const titleMatch = rawContent.match(/^#\s+(.*)$/m);
    const title = titleMatch ? titleMatch[1] : slug;

    return {
      slug,
      title,
      content: rawContent,
    };
  });
}
