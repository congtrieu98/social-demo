import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { postsRouter } from "./posts";
import { feedsRouter } from "./feeds";
import { mediasRouter } from "./medias";
import { usersRouter } from "./users";
import { followsRouter } from "./follows";
import { likesRouter } from "./likes";
import { webSockets } from "./webSockets";

export const appRouter = router({
  computers: computersRouter,
  posts: postsRouter,
  feeds: feedsRouter,
  medias: mediasRouter,
  users: usersRouter,
  follows: followsRouter,
  likes: likesRouter,
  ws: webSockets
});

export type AppRouter = typeof appRouter;
