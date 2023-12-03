import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFollow,
  deleteFollow,
  updateFollow,
} from "@/lib/api/follows/mutations";
import { 
  followIdSchema,
  insertFollowParams,
  updateFollowParams 
} from "@/lib/db/schema/follows";

export async function POST(req: Request) {
  try {
    const validatedData = insertFollowParams.parse(await req.json());
    const { follow, error } = await createFollow(validatedData);
    if (error) return NextResponse.json({ error }, { status: 500 });
    revalidatePath("/follows"); // optional - assumes you will have named route same as entity
    return NextResponse.json(follow, { status: 201 });
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

    const validatedData = updateFollowParams.parse(await req.json());
    const validatedParams = followIdSchema.parse({ id });

    const { follow, error } = await updateFollow(validatedParams.id, validatedData);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(follow, { status: 200 });
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

    const validatedParams = followIdSchema.parse({ id });
    const { follow, error } = await deleteFollow(validatedParams.id);
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(follow, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
