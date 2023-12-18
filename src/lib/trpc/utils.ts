// import { createWSClient, httpBatchLink } from "@trpc/client";
// import { createTRPCReact } from "@trpc/react-query";
// import { AppRouter } from "../server/routers/_app";

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

// const url = `${getBaseUrl()}/api/trpc`

// function getEndingLink() {
//   if (typeof window === 'undefined') {
//     return httpBatchLink({
//       url,
//     })
//   }
// }

// const client = createWSClient({
//   url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
// })
