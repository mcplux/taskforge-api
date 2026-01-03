import { model, Schema } from 'mongoose'

enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

interface ITask {
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: Date
}

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.LOW,
    },
    dueDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const Task = model<ITask>('Task', taskSchema)
