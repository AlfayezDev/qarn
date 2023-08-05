import { createEnv } from "@t3-oss/env-nextjs";
import { Config } from "sst/node/config";
import { z } from "zod";

export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  server: {
    DATABASE_URL: z.string().url().default(Config.DATABASE_URL),
    CLERK_SECRET_KEY: z.string().optional().default(Config.CLERK_SECRET_KEY),
    STRIPE_WEBHOOK_SECRET: z.string().default(Config.STRIPE_WEBHOOK_SECRET),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
      .string()
      .min(1).default(Config.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
  },
  // Client side variables gets destructured here due to Next.js static analysis
  // Shared ones are also included here for good measure since the behavior has been inconsistent
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
