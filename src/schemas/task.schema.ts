import z from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>

export const taskParamsSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
})

export type TaskParams = z.infer<typeof taskParamsSchema>
