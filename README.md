# 0x42sec.io — Personal Security Research Blog

A personal security research blog with two distinct UX layers:

1. **Terminal emulator** — an interactive CRT-style terminal on the homepage, boot sequence, ASCII banner, and a full set of commands for navigating the blog without ever leaving the keyboard.
2. **Web layer** — standard blog pages (post list, individual posts, about, projects, contact) styled with a dark phosphor-green aesthetic.

Live at: [0x42sec.io](https://0x42sec.io)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 4](https://astro.build/) (static output) |
| Hosting | GitHub Pages via GitHub Actions |
| Fonts | VT323, Share Tech Mono, Inconsolata (Google Fonts) |
| Styles | Custom CSS, no framework |
| Content | Astro Content Collections (`src/content/blog/*.md`) |

---

## Terminal emulator

The homepage (`src/pages/index.astro`) renders a fully interactive terminal. Blog post data is embedded at build time via `define:vars`.

### Available commands

| Command | Description |
|---|---|
| `help` | Show command list |
| `banner` | Redisplay ASCII banner |
| `about` | About the author |
| `projects` | Project list |
| `blog` | List all posts with tags and index numbers |
| `read <n>` | Open post `n` in a `less`-style pager (j/k scroll, Space/b page, g/G top/end, q quit, w open in browser) |
| `open <n>` | Navigate browser to the web version of post `n` |
| `contact` | Contact info |
| `ls` / `ll` | Virtual filesystem listing |
| `cd <dir>` | Navigate virtual filesystem |
| `clear` | Clear the terminal |
| `whoami` | Identity |
| `date` | Current date |
| `uptime` | Session uptime |
| `exit` | CRT fade-out effect, then navigate to `/blog` |

---

## Adding a new blog post

### Locally (recommended)

The repo includes a scaffold script that picks the next post number, slugifies the title, and opens the file in VS Code:

```bash
npm run new-post
# or pass the title directly:
npm run new-post -- "Your Post Title"
```

The script will prompt for:

| Prompt | Example |
|---|---|
| Title | `DJI DroneID deep dive` |
| Tags | `RF, Drones, Reverse Engineering` (comma-separated) |
| Description | `One sentence summary.` |

It then creates `src/content/blog/NN-your-post-title.md` with `draft: true` and opens it in VS Code. When the post is ready, set `draft: false` and push to `main` — GitHub Actions deploys automatically.

### On GitHub (no local setup needed)

1. Go to the repository on GitHub.
2. Navigate to **`src/content/blog/`**.
3. Click **Add file → Create new file**.
4. Name the file following the existing pattern: `07-your-post-slug.md` (increment the number prefix).
5. Paste the frontmatter and your content (template below).
6. Scroll down, write a commit message, and click **Commit changes** directly to `main`.
7. GitHub Actions will automatically build and deploy the site. Check the **Actions** tab — the deploy takes about a minute.

### Frontmatter template

```markdown
---
title: "Your Post Title"
date: 2026-04-20
tags: ["Tag1", "Tag2"]
description: "One sentence that summarises the post."
draft: false
---

## Introduction

Write your introduction here.

## Section

Content goes here.

## Conclusion

Wrap up here.
```

### Rules

- `date` — use `YYYY-MM-DD` format.
- `tags` — array of strings; shown in the terminal `blog` listing and on the web post page.
- `draft: true` — post is excluded from builds entirely; safe to commit in-progress work.
- The filename prefix (`01-`, `02-`, …) controls display order in the terminal and on the web list. Always increment by one from the last file.

---

## Project structure

```
src/
  content/
    blog/          ← all blog posts live here
  pages/
    index.astro    ← CRT terminal homepage
    blog/
      index.astro  ← web blog list
      [slug].astro ← individual web post
    about.astro
    projects.astro
    contact.astro
  layouts/
    Base.astro     ← HTML shell (nav, footer, global.css)
    BlogPost.astro ← blog post layout
  styles/
    global.css     ← all web-layer styles
public/
  CNAME            ← custom domain (0x42sec.io) for GitHub Pages
.github/
  workflows/
    deploy.yml     ← build + deploy on push to main
```

---

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
```

---

## Deployment

Pushing any commit to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the site and deploys it to GitHub Pages. No manual steps required after committing.
