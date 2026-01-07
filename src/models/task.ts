import { model, Schema } from 'mongoose'
import { ITask, TaskStatus, TaskPriority } from '../types/task.type'

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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
