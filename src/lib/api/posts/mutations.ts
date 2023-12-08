import { db } from "@/lib/db/index";
import {
  PostId,
  NewPostParams,
  UpdatePostParams,
  updatePostSchema,
  insertPostSchema,
  postIdSchema
} from "@/lib/db/schema/posts";
import { getUserAuth } from "@/lib/auth/utils";
import { PrismaClient } from "@prisma/client";
import { resend } from "@/lib/email";
import { EmailPost } from "@/components/emails/EmailPost";

// export const createPost = async (post: NewPostParams) => {
//   const { session } = await getUserAuth();
//   const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
//   try {
//     // @ts-ignore
//     const p = await db.post.create({ data: newPost });
//     const users = await db.user.findMany({ where: { id: session?.user.id }, include: { followers: true } });
//     if (users) {
//       users.forEach(async (user: any) => {
//         const { name, email } = user;
//         await resend.emails.send({
//           from: "Kirimase <onboarding@resend.dev>",
//           to: [email],
//           subject: `Hello ${name}!`,
//           // @ts-ignore
//           react: EmailPost({ name: name, post: p }),
//           text: "Email powered by Resend.",
//         });
//       });
//     }
//     return { post: p };
//   } catch (err) {
//     const message = (err as Error).message ?? "Error, please try again";
//     console.error(message);
//     return { error: message };
//   }
// };

export const createPost = async (post: NewPostParams) => {
  const { session } = await getUserAuth();
  const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
  // @ts-ignore
  const prisma = new PrismaClient().$extends({
    name: 'my name',
    query: {
      post: {
        async create() {
          const { session } = await getUserAuth();
          const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
          try {
            const post = await db.post.create({ data: newPost });
            if (post) {
              // Get user hiện tại
              const user = await db.user.findFirst({ where: { id: session?.user.id }, include: { followers: true } });
              if (user) {
              user?.followers.forEach(async item => {
                const userFollowed = await db.user.findMany({ where: { id: item.followerId } });
                if (userFollowed) {
                  userFollowed.forEach(async (u: any) => {
                    const { name, email } = u;
                    await resend.emails.send({
                      from: `SZG <${process.env.RESEND_EMAIL}>`,
                      to: [email],
                      subject: `Hello ${name}!`,
                      // @ts-ignore
                      react: EmailPost({ name: user.name, post: post }),
                      text: "Email powered by Resend.",
                    });
                  });
                }
              })
              }
            }
            return { post: post };
          } catch (err) {
            const message = (err as Error).message ?? "Error, please try again";
            console.error(message);
            return { error: message };
          }
        },
      },
    },
  });
  await prisma.post.create({ data: newPost })
};

export const updatePost = async (id: PostId, post: UpdatePostParams) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });
  const newPost = updatePostSchema.parse({ ...post, userId: session?.user.id! });
  try {
    // @ts-ignore
    const p = await db.post.update({ where: { id: postId, }, data: newPost })
    return { post: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deletePost = async (id: PostId) => {
  const { id: postId } = postIdSchema.parse({ id });
  try {
    // @ts-ignore
    const p = await db.post.delete({ where: { id: postId } })
    return { post: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

