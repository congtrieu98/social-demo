import { followSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getFollows } from "@/lib/api/follows/queries";


// Schema for follows - used to validate API requests
export const insertFollowSchema = followSchema.omit({ id: true });

export const insertFollowParams = followSchema.extend({}).omit({ 
  id: true
});

export const updateFollowSchema = followSchema;

export const updateFollowParams = updateFollowSchema.extend({})

export const followIdSchema = updateFollowSchema.pick({ id: true });

// Types for follows - used to type API request params and within Components
export type Follow = z.infer<typeof updateFollowSchema>;
export type NewFollow = z.infer<typeof insertFollowSchema>;
export type NewFollowParams = z.infer<typeof insertFollowParams>;
export type UpdateFollowParams = z.infer<typeof updateFollowParams>;
export type FollowId = z.infer<typeof followIdSchema>["id"];
    
// this type infers the return from getFollows() - meaning it will include any joins
export type CompleteFollow = Awaited<ReturnType<typeof getFollows>>["follows"][number];

