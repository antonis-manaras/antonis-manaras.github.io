import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
