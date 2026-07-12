import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { PostKind } from "@/types/enums";

const posts = defineCollection({
    loader: glob({ base: "./src/content", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        createdDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        kind: z.enum(PostKind).optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
    }).transform((data) => ({
        ...data,
        kind: data.kind ?? (data.title ? PostKind.Long : PostKind.Byte),
    })),
});

export const collections = { posts };
