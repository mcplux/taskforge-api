import { Request, Response } from 'express'
import {
  CreateTaskInput,
  TaskParams,
  UpdateTaskInput,
} from '../schemas/task.schema'
import { Task } from '../models/task'

export const createTask = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response
) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user!._id,
    })

    const populatedTask = await task.populate('user')

    return res.status(200).json({
      success: true,
      data: populatedTask,
    })
  } catch (error) {
    console.log('Error creating a task:', error)

    return res.status(500).json({
      success: false,
      error: 'Something went wrong',
    })
  }
}

export const getUserTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user!._id }).populate('user')
    return res.status(200).json({
      success: true,
      data: tasks,
    })
  } catch (error) {
    console.log('Error getting tasks:', error)

    return res.status(500).json({
      success: false,
      error: 'Something went wrong',
    })
  }
}

export const getOneTask = async (req: Request<TaskParams>, res: Response) => {
  const { id } = req.params

  try {
    const task = await Task.findOne({
      _id: id,
      user: req.user!._id,
    }).populate('user')

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with id ${id} not found`,
      })
    }

    return res.status(200).json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.log('Error getting a task:', error)

    return res.status(500).json({
      success: false,
      error: 'Something went wrong',
    })
  }
}

export const updateTask = async (
  req: Request<TaskParams, {}, UpdateTaskInput>,
  res: Response
) => {
  const { id } = req.params

  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: id,
        user: req.user!._id,
      },
      req.body,
      {
        new: true,
      }
    ).populate('user')
    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with id ${id} not found`,
      })
    }

    return res.status(200).json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.log('Error updating a task:', error)

    return res.status(500).json({
      success: false,
      error: 'Something went wrong',
    })
  }
}

export const deleteTask = async (req: Request<TaskParams>, res: Response) => {
  const { id } = req.params

  try {
    const deletedDocument = await Task.findOneAndDelete({
      _id: id,
      user: req.user!._id,
    })
    if (!deletedDocument) {
      return res.status(404).json({
        success: false,
        error: `Task with id ${id} not found`,
      })
    }

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log('Error deleting a task:', error)

    return res.status(500).json({
      success: false,
      error: 'Something went wrong',
    })
  }
}
