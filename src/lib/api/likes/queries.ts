import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type LikeId, likeIdSchema } from "@/lib/db/schema/likes";

export const getLikes = async () => {
  const { session } = await getUserAuth();
  //@ts-ignore
  const l = await db.like.findMany({ where: {userId: session?.user.id!}});
  return { likes: l };
};

export const getLikeById = async (id: LikeId) => {
  const { session } = await getUserAuth();
  const { id: likeId } = likeIdSchema.parse({ id });
  //@ts-ignore
  const l = await db.like.findFirst({
    where: { id: likeId, userId: session?.user.id!}});
  return { likes: l };
};

