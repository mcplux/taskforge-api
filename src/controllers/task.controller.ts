import { Request, Response } from 'express'
import { CreateTaskInput } from '../schemas/task.schema'
import { Task } from '../model/task'

export const createTask = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response
) => {
  try {
    const task = await Task.create({
      ...req.body,
    })

    return res.json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.log('Error creating a task:', error)

    return res.status(500).json({
      success: false,
      error: 'Something went wrong',
    })
  }
}
