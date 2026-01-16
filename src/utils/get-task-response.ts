import { ITask } from '../types/task.type'

export interface TaskResponse {
  id: string
  title: string
  description?: string
  status: string
  priority: string
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export const getTaskResponse = (task: ITask): TaskResponse => ({
  id: task._id,
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  dueDate: task.dueDate,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
})
