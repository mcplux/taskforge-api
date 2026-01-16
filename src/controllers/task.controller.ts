import { Request, Response } from 'express'
import {
  CreateTaskInput,
  TaskParams,
  UpdateTaskInput,
} from '../schemas/task.schema'
import { Task } from '../models/task'
import { ApiCode, ApiResponse } from '../types/api-response.type'
import { getTaskResponse, TaskResponse } from '../utils/get-task-response'

export const createTask = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response<ApiResponse<{ task: TaskResponse }>>
) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user!._id,
    })

    return res.status(200).json({
      success: true,
      code: ApiCode.TASK_CREATED,
      data: {
        task: getTaskResponse(task),
      },
    })
  } catch (error) {
    console.log('Error creating a task:', error)

    return res.status(500).json({
      success: false,
      code: ApiCode.INTERNAL_ERROR,
    })
  }
}

export const getUserTasks = async (
  req: Request,
  res: Response<ApiResponse<{ tasks: TaskResponse[] }>>
) => {
  try {
    const tasks = await Task.find({ user: req.user!._id })
    return res.status(200).json({
      success: true,
      code: ApiCode.SUCCESS,
      data: {
        tasks: tasks.map((task) => getTaskResponse(task)),
      },
    })
  } catch (error) {
    console.log('Error getting tasks:', error)

    return res.status(500).json({
      success: false,
      code: ApiCode.INTERNAL_ERROR,
    })
  }
}

export const getOneTask = async (
  req: Request<TaskParams>,
  res: Response<ApiResponse<{ task: TaskResponse }>>
) => {
  const { id } = req.params

  try {
    const task = await Task.findOne({
      _id: id,
      user: req.user!._id,
    })

    if (!task) {
      return res.status(404).json({
        success: false,
        code: ApiCode.TASK_NOT_FOUND,
        details: {
          id: [`Task with id ${id} not found`],
        },
      })
    }

    return res.status(200).json({
      success: true,
      code: ApiCode.SUCCESS,
      data: {
        task: getTaskResponse(task),
      },
    })
  } catch (error) {
    console.log('Error getting a task:', error)

    return res.status(500).json({
      success: false,
      code: ApiCode.INTERNAL_ERROR,
    })
  }
}

export const updateTask = async (
  req: Request<TaskParams, {}, UpdateTaskInput>,
  res: Response<ApiResponse<{ task: TaskResponse }>>
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
    )

    if (!task) {
      return res.status(404).json({
        success: false,
        code: ApiCode.TASK_NOT_FOUND,
        details: {
          id: [`Task with id ${id} not found`],
        },
      })
    }

    return res.status(200).json({
      success: true,
      code: ApiCode.SUCCESS,
      data: {
        task: getTaskResponse(task),
      },
    })
  } catch (error) {
    console.log('Error updating a task:', error)

    return res.status(500).json({
      success: false,
      code: ApiCode.INTERNAL_ERROR,
    })
  }
}

export const deleteTask = async (
  req: Request<TaskParams>,
  res: Response<ApiResponse>
) => {
  const { id } = req.params

  try {
    const deletedDocument = await Task.findOneAndDelete({
      _id: id,
      user: req.user!._id,
    })

    if (!deletedDocument) {
      return res.status(404).json({
        success: false,
        code: ApiCode.TASK_NOT_FOUND,
        details: {
          id: [`Task with id ${id} not found`],
        },
      })
    }

    return res.status(200).json({
      success: true,
      code: ApiCode.TASK_DELETED,
    })
  } catch (error) {
    console.log('Error deleting a task:', error)

    return res.status(500).json({
      success: false,
      code: ApiCode.INTERNAL_ERROR,
    })
  }
}
