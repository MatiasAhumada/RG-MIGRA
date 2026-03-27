import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.preprocess((value) => Number(value), z.number()).default(3000),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.preprocess((value) => Number(value), z.number()).default(5432),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string().default('1h'),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRATION: z.string().default('7d'),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default('onboarding@resend.dev'),
  CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string().optional(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string().optional(),
  CLOUDFLARE_BUCKET_NAME: z.string().optional(),
  CLOUDFLARE_BUCKET_URL: z.string().optional(),
  CLOUDFLARE_REGION: z.string().default('auto'),
})

export type EnvSchema = z.infer<typeof envSchema>

export function validateEnv(env: Record<string, unknown>): EnvSchema {
  return envSchema.parse(env)
}
