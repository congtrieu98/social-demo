import { createFollowUser, unFollowUser } from "@/lib/api/users/mutations";
import { getUsers } from "@/lib/api/users/queries"
import { followIdSchema, insertFollowSchema } from "@/lib/db/schema/follows";
import { publicProcedure, router } from "@/lib/server/trpc";

export const usersRouter = router({
    getUsers: publicProcedure.query(async () => {
        return getUsers();
    }),
    createFollowUser: publicProcedure
    .input(insertFollowSchema)
    .mutation(async ({ input }) => {
        return createFollowUser(input)
    }),
    unFollowUser: publicProcedure
    .input(followIdSchema)
    .mutation(async ({ input }) => {
        return unFollowUser(input.id)
    })
});