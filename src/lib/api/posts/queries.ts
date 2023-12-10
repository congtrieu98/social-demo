import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type PostId, postIdSchema } from "@/lib/db/schema/posts";

export const getPosts = async () => {
  // @ts-ignore
  const p = await db.post.findMany({
    include: { likes: true },
  });
  return { posts: p };
};

export const getPostById = async (id: PostId) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });
  // @ts-ignore
  const p = await db.post.findFirst({
    where: { id: postId, userId: session?.user.id! }
  });
  return { posts: p };
};

export const getPostLiked = async (postId: PostId) => {
  const { session } = await getUserAuth();
  //@ts-ignore
  const getLikePostById = await db.like.findMany({
    where: { postId: postId, userId: session?.user?.id }
  });
  if (getLikePostById.length > 0) {
    return { checkPostLiked: true }
  }
  return { checkPostLiked: false }
}

