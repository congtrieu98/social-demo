import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { postsRouter } from "./posts";
import { feedsRouter } from "./feeds";
import { mediasRouter } from "./medias";
import { usersRouter } from "./users";
import { followsRouter } from "./follows";
import { likesRouter } from "./likes";

export const appRouter = router({
  computers: computersRouter,
  posts: postsRouter,
  feeds: feedsRouter,
  medias: mediasRouter,
  users: usersRouter,
  follows: followsRouter,
  likes: likesRouter,
});

export type AppRouter = typeof appRouter;
