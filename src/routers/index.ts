import { Router } from 'express'
import authRouter from './auth.router'
import taskRouter from './task.router'
import { auth } from '../middlewares/auth'

const router = Router()

router.use('/auth', authRouter)
router.use('/tasks', auth, taskRouter)

export default router
