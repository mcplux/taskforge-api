import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envShcema = z.object({
  // API
  PORT: z
    .string()
    .regex(/^\d+$/, 'PORT must be an integer')
    .default('3000')
    .transform(Number),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  // MongoDB
  MONGO_USER: z.string().min(1, 'MONGO_USER is required'),
  MONGO_PASSWORD: z.string().min(1, 'MONGO_PASSWORD is required'),
  MONGO_HOST: z.string().min(1, 'MONGO_HOST is required'),
  MONGO_PORT: z
    .string()
    .regex(/^\d+$/, 'MONGO_PORT must be an integer')
    .transform(Number),
  MONGO_DB: z.string().min(1, 'MONGO_DB is required'),
})

const parsed = envShcema.safeParse(process.env)

if (!parsed.success) {
  const flattenedErrors = z.flattenError(parsed.error)
  console.error('Invalid environment variables:', flattenedErrors.fieldErrors)
  process.exit(1)
}

export const env = parsed.data
