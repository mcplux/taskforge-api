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
})

const parsed = envShcema.safeParse(process.env)

if (!parsed.success) {
  const flattenedErrors = z.flattenError(parsed.error)
  console.error('Invalid environment variables:', flattenedErrors.fieldErrors)
  process.exit(1)
}

export const env = parsed.data
