import * as z from "zod"
import { CompleteAccount, relatedAccountSchema, CompleteSession, relatedSessionSchema, CompletePost, relatedPostSchema, CompleteFeed, relatedFeedSchema, CompleteFollow, relatedFollowSchema, CompleteLike, relatedLikeSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  posts: CompletePost[]
  feeds: CompleteFeed[]
  follows: CompleteFollow[]
  followers: CompleteFollow[]
  likes: CompleteLike[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  accounts: relatedAccountSchema.array(),
  sessions: relatedSessionSchema.array(),
  posts: relatedPostSchema.array(),
  feeds: relatedFeedSchema.array(),
  follows: relatedFollowSchema.array(),
  followers: relatedFollowSchema.array(),
  likes: relatedLikeSchema.array(),
}))
