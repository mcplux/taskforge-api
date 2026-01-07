import { Router } from 'express'
import authRouter from './auth.router'
import taskRouter from './task.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/tasks', taskRouter)

export default router
