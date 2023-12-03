import { getFollowById, getFollows } from "@/lib/api/follows/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  followIdSchema,
  insertFollowParams,
  updateFollowParams,
} from "@/lib/db/schema/follows";
import { createFollow, deleteFollow, updateFollow } from "@/lib/api/follows/mutations";

export const followsRouter = router({
  getFollows: publicProcedure.query(async () => {
    return getFollows();
  }),
  getFollowById: publicProcedure.input(followIdSchema).query(async ({ input }) => {
    return getFollowById(input.id);
  }),
  createFollow: publicProcedure
    .input(insertFollowParams)
    .mutation(async ({ input }) => {
      return createFollow(input);
    }),
  updateFollow: publicProcedure
    .input(updateFollowParams)
    .mutation(async ({ input }) => {
      return updateFollow(input.id, input);
    }),
  deleteFollow: publicProcedure
    .input(followIdSchema)
    .mutation(async ({ input }) => {
      return deleteFollow(input.id);
    }),
});
