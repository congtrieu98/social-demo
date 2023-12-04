
import { db } from "@/lib/db/index";
import { 
  insertFollowSchema,
  NewFollowParams,
  FollowId
} from "@/lib/db/schema/follows";


export const createFollowUser = async (follow: NewFollowParams) => {
  const newFollow = insertFollowSchema.parse(follow);
  try {
    // @ts-ignore
    const f = await db.follow.create({
      data: {
        follower: {
          connect: {
            id: newFollow.followerId
          }
        },
        followed: {
          connect: {
            id: newFollow.followedId
          }
        }
      }
    });
    return { follow: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const unFollowUser = async (id: FollowId ) => {
  try {
    // @ts-ignore
    const u = await db.follow.delete({ where: {id : id}})
    return { users: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
  
}