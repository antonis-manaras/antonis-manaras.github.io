import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://0x42sec.io',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
