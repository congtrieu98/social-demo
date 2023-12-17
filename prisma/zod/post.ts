import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteLike, relatedLikeSchema } from "./index"

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  userId: z.string(),
  likeTotal: z.number().int().nullish(),
})

export interface CompletePost extends z.infer<typeof postSchema> {
  user: CompleteUser
  likes: CompleteLike[]
}

/**
 * relatedPostSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPostSchema: z.ZodSchema<CompletePost> = z.lazy(() => postSchema.extend({
  user: relatedUserSchema,
  likes: relatedLikeSchema.array(),
}))
