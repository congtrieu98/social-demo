import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createLike,
  deleteLike,
  updateLike,
} from "@/lib/api/likes/mutations";
import { 
  likeIdSchema,
  insertLikeParams,
  updateLikeParams 
} from "@/lib/db/schema/likes";

export async function POST(req: Request) {
  try {
    const validatedData = insertLikeParams.parse(await req.json());
    const { like, error } = await createLike(validatedData);
    if (error) return NextResponse.json({ error }, { status: 500 });
    revalidatePath("/likes"); // optional - assumes you will have named route same as entity
    return NextResponse.json(like, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateLikeParams.parse(await req.json());
    const validatedParams = likeIdSchema.parse({ id });

    const { like, error } = await updateLike(validatedParams.id, validatedData);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(like, { status: 200 });
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

    const validatedParams = likeIdSchema.parse({ id });
    const { like, error } = await deleteLike(validatedParams.id);
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(like, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
