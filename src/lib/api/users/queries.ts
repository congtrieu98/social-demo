import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { FollowedId } from "@/lib/db/schema/follows";

export const getUsers = async () => {
  const { session } = await getUserAuth();
  //@ts-ignore
  const u = await db.user.findMany({
    where: { id: { not: session?.user.id } },
    // @ts-ignore
    include: { followers: true, likes: true },
  });
  return { users: u };
};

export const getUserById = async () => {
  const { session } = await getUserAuth();
  //@ts-ignore
  return await db.user.findFirst({
    where: { id:  session?.user.id },
    include: { likes: true },
  });
};

export const getUserFollowes = async (followedId: FollowedId) => {
  const { session } = await getUserAuth();
  //@ts-ignore
  const users = await db.follow.findMany({
    where: { followerId: session?.user?.id, followedId: followedId } 
  });
  
  if (users?.length > 0) {
    return {checkFollow : true}
  }

  return { checkFollow: false}
}
