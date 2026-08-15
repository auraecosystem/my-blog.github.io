npm install -D sass
man git-remote add origin git@github.com:auraecosystem/my-blog.git
git branch -M main
git push -u origin main
cd my-blog
git init
git add .
git commit -m "feat: initialize blog repository setup"
npm install gray-matter highlight.js marked
git remote add origin https://github.com/auraecosystem/my-blog.github.io.git
# Or if origin already exists:
git remote set-url origin https://github.com/auraecosystem/my-blog.github.io.git
git clone https://github.com/auraecosystem/my-blog.github.io.git
cd my-blog.github.io
git add .
git commit -m "Update blog content"
git push -u origin main
