import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Entry IDs are the last segment of the frontmatter slug, e.g.
// "/blog/apple-m1-developer" -> "apple-m1-developer", so routes can use
// `entry.id` directly while the full slug stays in the data for canonical URLs.
const idFromSlug = ({ data }: { data: Record<string, unknown> }) =>
  String(data.slug).split("/").filter(Boolean).pop()!;

const posts = defineCollection({
  loader: glob({
    pattern: "*/*.{md,mdx}",
    base: "./src/content/posts",
    generateId: idFromSlug,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().regex(/^\/blog\/[\w-]+$/),
      author: z.string(),
      date: z.coerce.date(),
      image: image(),
      imageAltText: z.string(),
      imageCredit: z.string().optional(),
      keywords: z.array(z.string()).default([]),
      published: z.boolean().default(true),
    }),
});

const portfolio = defineCollection({
  loader: glob({
    pattern: "*/*.{md,mdx}",
    base: "./src/content/portfolio",
    generateId: idFromSlug,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      slug: z.string().regex(/^\/portfolio\/[\w-]+$/),
      type: z.enum(["project", "challenge"]),
      author: z.string(),
      date: z.coerce.date(),
      image: image(),
      using: z.string().optional(),
      link: z.url().optional(),
      source: z.url().optional(),
      sortOrder: z.number().optional(),
      published: z.boolean().default(false),
    }),
});

export const collections = { posts, portfolio };
