import { db } from "@/lib/db/index";
import {
  LikeId,
  NewLikeParams,
  UpdateLikeParams,
  updateLikeSchema,
  insertLikeSchema,
  likeIdSchema
} from "@/lib/db/schema/likes";
import { getUserAuth } from "@/lib/auth/utils";
import { resend } from "@/lib/email";
import { EmailLiked } from "@/components/emails/EmailLiked";

export const createLike = async (like: NewLikeParams) => {
  const { session } = await getUserAuth();
  const newLike = insertLikeSchema.parse({ ...like, userId: session?.user.id! });
  try {
    //@ts-ignore
    const liked = await db.like.findFirst({
      where: {
        postId: like.postId,
        userId: session?.user.id
      }
    });
    if (liked) {
      //@ts-ignore
      const l = await db.like.delete({ where: { id: liked.id, userId: session?.user.id! } })
      return { like: l };
    } else {
      const l = await db.like.create({ data: newLike });
      const findPostById = await db.post.findFirst({
        where: { id: l.postId }
      })

      const checkUserLike = await db.user.findFirst({
        where: { id: { not: findPostById?.userId }, AND: { id: l.userId } }
      });

      console.log("firtLikeeeeee:", checkUserLike)
      console.log("firtLikeeeeeeuihturehgrkgbkbgrgbrgkbgkbkgbkjgbkfd")
      console.log("firtLikeeeeeeuihturehgrkgbkbgrgbrgkbgkbkgbkjgbkfd")
      console.log("firtLikeeeeeeuihturehgrkgbkbgrgbrgkbgkbkgbkjgbkfd")
      console.log("firtLikeeeeeeuihturehgrkgbkbgrgbrgkbgkbkgbkjgbkfd")
      console.log("firtLikeeeeeeuihturehgrkgbkbgrgbrgkbgkbkgbkjgbkfd")

      if (checkUserLike) {
        const { name, email } = checkUserLike;
        await resend.emails.send({
          from: `SZG <${process.env.RESEND_EMAIL}>`,
          to: [email as string],
          subject: `Hello ${name}!`,
          // @ts-ignore
          react: EmailLiked({ name: name, user: checkUserLike }),
          text: "Email powered by Resend.",
        });
      }
      return { like: l };
    }

  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateLike = async (id: LikeId, like: UpdateLikeParams) => {
  const { session } = await getUserAuth();
  const { id: likeId } = likeIdSchema.parse({ id });
  const newLike = updateLikeSchema.parse({ ...like, userId: session?.user.id! });
  try {
    //@ts-ignore
    const l = await db.like.update({ where: { id: likeId, userId: session?.user.id! }, data: newLike })
    return { like: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteLike = async (id: LikeId) => {
  const { session } = await getUserAuth();
  const { id: likeId } = likeIdSchema.parse({ id });
  try {
    //@ts-ignore
    const l = await db.like.delete({ where: { id: likeId, userId: session?.user.id! } })
    return { like: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

