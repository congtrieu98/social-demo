import { db } from "@/lib/db/index";
import { 
  FollowId, 
  NewFollowParams,
  UpdateFollowParams, 
  updateFollowSchema,
  insertFollowSchema, 
  followIdSchema 
} from "@/lib/db/schema/follows";

export const createFollow = async (follow: NewFollowParams) => {
  const newFollow = insertFollowSchema.parse(follow);
  try {
    // @ts-ignore
    const f = await db.follow.create({ data: newFollow });
    return { follow: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateFollow = async (id: FollowId, follow: UpdateFollowParams) => {
  const { id: followId } = followIdSchema.parse({ id });
  const newFollow = updateFollowSchema.parse(follow);
  try {
    // @ts-ignore
    const f = await db.follow.update({ where: { id: followId }, data: newFollow})
    return { follow: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteFollow = async (id: FollowId) => {
  const { id: followId } = followIdSchema.parse({ id });
  try {
    // @ts-ignore
    const f = await db.follow.delete({ where: { id: followId }})
    return { follow: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

