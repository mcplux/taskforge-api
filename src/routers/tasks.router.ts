import { Router } from 'express'
import {
  createTask,
  getOneTask,
  getUserTasks,
} from '../controllers/task.controller'
import { validateSchema } from '../middlewares/validate-schema'
import { createTaskSchema, taskParamsSchema } from '../schemas/task.schema'

const taskRouter = Router()

taskRouter.post('/', validateSchema(createTaskSchema), createTask)
taskRouter.get('/', getUserTasks)
taskRouter.get('/:id', validateSchema(taskParamsSchema, 'params'), getOneTask)

export default taskRouter
