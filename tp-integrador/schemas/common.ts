import * as z from 'zod'

export const CreatePageSchema = z.object({
  title: z.string(),
  imageUrl: z.optional(z.string()),
  isPublic: z.boolean(),
  markdown: z.string(),
  tags: z.array(z.string()),
})


export const CreateTagSchema = z.object({
  name: z.string(),
});