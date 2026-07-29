import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const contentItem = z.object({
  title: z.string(),
  body: z.string(),
});

const capabilities = defineCollection({
  loader: glob({
    base: "./src/content/capabilities",
    pattern: "**/*.{yml,yaml}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      order: z.number().int().positive(),
      featuredOnHome: z.boolean().default(true),
      draft: z.boolean().default(false),
      image: image(),
      imageAlt: z.string(),
      seo: z.object({
        title: z.string(),
        description: z.string(),
      }),
      hero: z.object({
        eyebrow: z.string(),
        heading: z.string(),
        introduction: z.string(),
      }),
      details: z.object({
        eyebrow: z.string(),
        heading: z.string(),
        introduction: z.string(),
        items: z.array(contentItem).length(3),
      }),
      workflow: z.object({
        eyebrow: z.string(),
        heading: z.string(),
        introduction: z.string(),
        items: z.array(contentItem).length(3),
      }),
      implementation: z.object({
        eyebrow: z.string(),
        heading: z.string(),
        introduction: z.string(),
        steps: z.array(contentItem).length(3),
      }),
      cta: z.object({
        heading: z.string(),
        body: z.string(),
        label: z.string(),
        href: z.string(),
      }),
    }),
});

export const collections = { capabilities };
