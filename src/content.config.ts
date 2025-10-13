import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const episodes = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/lib/episodes" }),
  schema: z.object({
    createdAt: z.string().optional(),
    episode: z.number(),
    season: z.number(),
    id: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    url: z.string(),
  }),
});

export const collections = { episodes };