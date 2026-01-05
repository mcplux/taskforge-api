import { Router } from 'express'
import {
  createTask,
  getOneTask,
  getUserTasks,
  updateTask,
} from '../controllers/task.controller'
import { validateSchema } from '../middlewares/validate-schema'
import {
  createTaskSchema,
  taskParamsSchema,
  updateTaskSchema,
} from '../schemas/task.schema'

const taskRouter = Router()

taskRouter.post('/', validateSchema(createTaskSchema), createTask)
taskRouter.get('/', getUserTasks)
taskRouter.get('/:id', validateSchema(taskParamsSchema, 'params'), getOneTask)
taskRouter.patch(
  '/:id',
  validateSchema(taskParamsSchema, 'params'),
  validateSchema(updateTaskSchema, 'body'),
  updateTask
)

export default taskRouter
