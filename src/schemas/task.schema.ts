import z from 'zod'
import { TaskPriority, TaskStatus } from '../model/task'

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>

export const taskParamsSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
})

export type TaskParams = z.infer<typeof taskParamsSchema>

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(TaskStatus).optional(),
  priority: z.enum(TaskPriority).optional(),
  dueDate: z.coerce.date().optional(),
})

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
