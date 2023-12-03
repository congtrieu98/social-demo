import { Resend } from "resend";
import { env } from "@/lib/env.mjs";

// @ts-ignore
export const resend = new Resend(env.RESEND_API_KEY);
