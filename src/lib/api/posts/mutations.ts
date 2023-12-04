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
import { resend } from "@/lib/email";
import { EmailPost } from "@/components/emails/EmailPost";

export const createPost = async (post: NewPostParams) => {
  const { session } = await getUserAuth();
  const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
  try {
    // @ts-ignore
    const p = await db.post.create({ data: newPost });
    const users = await db.user.findMany({ where: { id: session?.user.id }, include: { followers: true, follows: true } });
    console.log(users)
    console.log(users[0].followers)
    console.log(users[0].follows)
    if (users) {
      users.forEach(async (user: any) => {
        // TODO
        // Lúc follow add đang sai logic dẫn đến gửi email bị sai
        const { name, email } = user;
        // await resend.emails.send({
        //   from: "Kirimase <onboarding@resend.dev>",
        //   to: [email],
        //   subject: `Hello ${name}!`,
        //   // @ts-ignore
        //   react: EmailPost({ name: name, post: p }),
        //   text: "Email powered by Resend.",
        // });
      });
    }
    return { post: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

// export const createPosts = async (post: NewPostParams) => {
//   const { session } = await getUserAuth();
//   const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
//   // @ts-ignore
//   const prisma = new PrismaClient().$extends({
//     query: {
//       post: {
//         async create() {
//           const { session } = await getUserAuth();
//           console.log("session user:", session)
//           const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
//           try {
//             const p = await db.post.create({ data: newPost });
//             if (p) {
//               console.log("data baif posst:", p)
//               const user = await db.user.findMany({ where: { id: session?.user.id }, include: { followers: true } });
//               if (user) {
//                 user.forEach(async (follower: any) => {
//                   const { name, email } = follower;
//                   await resend.emails.send({
//                     from: "Kirimase <onboarding@resend.dev>",
//                     to: [email],
//                     subject: `Hello ${name}!`,
//                     // @ts-ignore
//                     react: EmailPost({ name: name, post: p }),
//                     text: "Email powered by Resend.",
//                   });
//                 });
//               }
//             }
//             return { post: p };
//           } catch (err) {
//             const message = (err as Error).message ?? "Error, please try again";
//             console.error(message);
//             return { error: message };
//           }
//         },
//       },
//     },
//   });
//   await prisma.post.create({ data: newPost })
// };

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

