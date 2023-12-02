import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFeed,
  deleteFeed,
  updateFeed,
} from "@/lib/api/feeds/mutations";
import { 
  feedIdSchema,
  insertFeedParams,
  updateFeedParams 
} from "@/lib/db/schema/feeds";

export async function POST(req: Request) {
  try {
    const validatedData = insertFeedParams.parse(await req.json());
    const { feed, error } = await createFeed(validatedData);
    if (error) return NextResponse.json({ error }, { status: 500 });
    revalidatePath("/feeds"); // optional - assumes you will have named route same as entity
    return NextResponse.json(feed, { status: 201 });
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

    const validatedData = updateFeedParams.parse(await req.json());
    const validatedParams = feedIdSchema.parse({ id });

    const { feed, error } = await updateFeed(validatedParams.id, validatedData);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(feed, { status: 200 });
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

    const validatedParams = feedIdSchema.parse({ id });
    const { feed, error } = await deleteFeed(validatedParams.id);
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(feed, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
