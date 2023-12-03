import { db } from "@/lib/db/index";
import { type FollowId, followIdSchema } from "@/lib/db/schema/follows";

export const getFollows = async () => {
  const f = await db.follow.findMany({});
  return { follows: f };
};

export const getFollowById = async (id: FollowId) => {
  const { id: followId } = followIdSchema.parse({ id });
  const f = await db.follow.findFirst({
    where: { id: followId}});
  return { follows: f };
};

