#!/usr/bin/env node
/**
 * Usage:
 *   npm run new-post
 *   npm run new-post -- "My Post Title"
 */

import { readdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR  = join(__dirname, '..', 'src', 'content', 'blog');

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function today() {
  return new Date().toISOString().split('T')[0];
}

async function nextNumber() {
  const files = await readdir(BLOG_DIR);
  const nums  = files
    .filter(f => /^\d+/.test(f) && f.endsWith('.md'))
    .map(f => parseInt(f));
  return nums.length ? Math.max(...nums) + 1 : 1;
}

async function ask(rl, question) {
  return new Promise(resolve =>
    rl.question(question, ans => resolve(ans.trim()))
  );
}

async function main() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  console.log('\n  0x42sec // new post\n');

  const title = process.argv.slice(2).join(' ') || await ask(rl, '  Title       : ');
  if (!title) { console.error('\n  Error: title is required.\n'); rl.close(); process.exit(1); }

  const tagsRaw = await ask(rl, '  Tags        : ');
  const desc    = await ask(rl, '  Description : ');
  rl.close();

  const tags     = tagsRaw.split(',').map(t => `"${t.trim()}"`).filter(t => t !== '""');
  const num      = await nextNumber();
  const slug     = slugify(title);
  const filename = `${String(num).padStart(2, '0')}-${slug}.md`;
  const filepath = join(BLOG_DIR, filename);

  const content = `---
title: "${title}"
date: ${today()}
tags: [${tags.join(', ')}]
description: "${desc}"
draft: true
---

## Introduction

Write your introduction here.

## Section

Content goes here.

## Conclusion

Wrap up here.
`;

  await writeFile(filepath, content, 'utf8');

  console.log(`\n  Created  →  src/content/blog/${filename}`);
  console.log('  Status   →  draft: true (set to false when ready to publish)\n');

  // Try to open in VS Code
  try {
    execSync(`code "${filepath}"`, { stdio: 'ignore' });
  } catch {
    // VS Code not in PATH — user can open manually
  }
}

main().catch(err => { console.error(err.message); process.exit(1); });
