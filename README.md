# Your Next.js Blog Template

This is a clean, minimal, and performant blog template built with Next.js, Tailwind CSS, and ShadCN UI. It's designed to be a perfect starting point for your personal or professional blog, with content managed directly through Markdown files.

## Getting Started

To get started, you can customize the site by editing the following files:

- **`src/app/layout.tsx`**: Change the site title and description metadata.
- **`src/components/header.tsx` & `src/components/footer.tsx`**: Update the header and footer with your own branding.
- **`src/app/about/page.tsx`**: Edit the content of the "About" page.
- **`src/app/globals.css`**: Adjust the color theme to your liking by changing the HSL values.

## Adding a New Post

Managing your blog content is done right in your project's codebase.

1.  **Navigate to the `content/posts` directory** in your project.
2.  **Create a new Markdown file** (e.g., `my-first-post.md`). The name of this file will become the post's URL slug (e.g., `/posts/my-first-post`).
3.  **Add frontmatter** to the top of your new file. This is where you set the title, date, author, and categories. Here's an example:

    ```markdown
    ---
    title: 'My First Post'
    date: '2024-07-31'
    author: 'Your Name'
    excerpt: 'This is a short summary of my awesome new post.'
    categories: ['Welcome', 'First Post']
    ---
    ```

4.  **Write your content** below the frontmatter using Markdown syntax.
5.  **Commit and push** your changes to your GitHub repository. If you have deployment set up, your site will automatically rebuild and your new post will appear.

## Deployment

For instructions on how to deploy your blog to the web, please see the `DEPLOY_GUIDE.md` file.
