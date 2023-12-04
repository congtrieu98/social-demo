
import { db } from "@/lib/db/index";
import { 
  insertFollowSchema,
  NewFollowParams,
} from "@/lib/db/schema/follows";


export const createFollowUser = async (follow: NewFollowParams) => {
  const newFollow = insertFollowSchema.parse(follow);
  try {
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