import { Request, Response } from 'express'
import { CreateTaskInput } from '../schemas/task.schema'
import { Task } from '../model/task'

export const createTask = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response
) => {
  const task = await Task.create({
    ...req.body,
  })

  return res.json({
    success: true,
    data: task,
  })
}
