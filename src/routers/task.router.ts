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
 *    summary: Create a new task
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
 *        description: Success
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
 *        description: Success
 */
taskRouter.get('/', getUserTasks)

/**
 * @openapi
 * /api/tasks/{taskId}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: taskId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the task
 *    security:
 *      - auth: []
 *    summary: Get one task
 *    tags:
 *      - Tasks
 *    responses:
 *      200:
 *        description: Success
 */
taskRouter.get('/:id', validateSchema(taskParamsSchema, 'params'), getOneTask)

/**
 * @openapi
 * /api/tasks/{taskId}:
 *  patch:
 *    parameters:
 *      - in: path
 *        name: taskId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the task
 *    security:
 *      - auth: []
 *    summary: Update one task
 *    tags:
 *      - Tasks
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateTaskRequest'
 *    responses:
 *      200:
 *        description: Success
 */
taskRouter.patch(
  '/:id',
  validateSchema(taskParamsSchema, 'params'),
  validateSchema(updateTaskSchema, 'body'),
  updateTask
)

/**
 * @openapi
 * /api/tasks/{taskId}:
 *  delete:
 *    parameters:
 *      - in: path
 *        name: taskId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the task
 *    security:
 *      - auth: []
 *    summary: Delete one task
 *    tags:
 *      - Tasks
 *    responses:
 *      200:
 *        description: Success
 */
taskRouter.delete(
  '/:id',
  validateSchema(taskParamsSchema, 'params'),
  deleteTask
)

export default taskRouter
