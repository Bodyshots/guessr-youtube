import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const server = {
  // Environment
  NODE_ENV: z.enum(["development", "production", "test"]),
  BACKEND_URL: z.string()
} as const;

const client = {
  NEXT_PUBLIC_BASE_URL: z.url(),
} as const;

export const env = createEnv({
  server,
  client,
  skipValidation: !!process.env.CI,
  runtimeEnv: {
    // Environment
    NODE_ENV: process.env.NODE_ENV,

    BACKEND_URL: process.env.BACKEND_URL,

    // Public
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
