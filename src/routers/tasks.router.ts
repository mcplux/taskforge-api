import { Router } from 'express'
import { createTask } from '../controllers/task.controller'
import { validateBody } from '../middlewares/validate-schema'
import { createTaskSchema } from '../schemas/task.schema'

const taskRouter = Router()

taskRouter.post('/', validateBody(createTaskSchema), createTask)

export default taskRouter
