import { Router } from 'express'
import { register } from '../controllers/auth.controller'
import { validateSchema } from '../middlewares/validate-schema'
import { registerSchema } from '../schemas/auth.schema'
import { hashPassword } from '../middlewares/hass-password'

const authRouter = Router()

authRouter.post(
  '/register',
  validateSchema(registerSchema, 'body'),
  hashPassword,
  register
)

export default authRouter
