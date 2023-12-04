import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createPost,
  deletePost,
  updatePost,
} from "@/lib/api/posts/mutations";
import {
  postIdSchema,
  insertPostParams,
  updatePostParams
} from "@/lib/db/schema/posts";

// export async function POST(req: Request) {
//   try {
//     const validatedData = insertPostParams.parse(await req.json());
//     //
//     const { post, error } = await createPost(validatedData);
//     if (error) return NextResponse.json({ error }, { status: 500 });
//     revalidatePath("/posts"); // optional - assumes you will have named route same as entity
//     return NextResponse.json(post, { status: 201 });
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       return NextResponse.json({ error: err.issues }, { status: 400 });
//     } else {
//       return NextResponse.json({ error: err }, { status: 500 });
//     }
//   }
// }


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updatePostParams.parse(await req.json());
    const validatedParams = postIdSchema.parse({ id });

    const { post, error } = await updatePost(validatedParams.id, validatedData);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = postIdSchema.parse({ id });
    const { post, error } = await deletePost(validatedParams.id);
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
