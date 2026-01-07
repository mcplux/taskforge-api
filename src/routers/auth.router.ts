import { Router } from 'express'
import { login, register } from '../controllers/auth.controller'
import { validateSchema } from '../middlewares/validate-schema'
import { loginSchema, registerSchema } from '../schemas/auth.schema'
import { hashPassword } from '../middlewares/hash-password'

const authRouter = Router()

authRouter.post(
  '/register',
  validateSchema(registerSchema, 'body'),
  hashPassword,
  register
)

authRouter.post('/login', validateSchema(loginSchema), login)

export default authRouter
