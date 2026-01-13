import { Router } from 'express'
import {
  createTask,
  deleteTask,
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

/**
 * @openapi
 * /api/tasks:
 *  post:
 *    security:
 *      - auth: []
 *    summary: Create a new tasks
 *    tags:
 *      - Tasks
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateTaskRequest'
 *    responses:
 *      200:
 *        description: Task created
 */
taskRouter.post('/', validateSchema(createTaskSchema), createTask)

/**
 * @openapi
 * /api/tasks:
 *  get:
 *    security:
 *      - auth: []
 *    summary: Get user tasks
 *    tags:
 *      - Tasks
 *    responses:
 *      200:
 *        description: List of tasks
 */
taskRouter.get('/', getUserTasks)
taskRouter.get('/:id', validateSchema(taskParamsSchema, 'params'), getOneTask)
taskRouter.patch(
  '/:id',
  validateSchema(taskParamsSchema, 'params'),
  validateSchema(updateTaskSchema, 'body'),
  updateTask
)
taskRouter.delete(
  '/:id',
  validateSchema(taskParamsSchema, 'params'),
  deleteTask
)

export default taskRouter
