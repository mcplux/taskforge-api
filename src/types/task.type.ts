export interface ITask {
  _id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  user: string
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
