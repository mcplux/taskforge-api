import { Router } from 'express'
import { login, register } from '../controllers/auth.controller'
import { validateSchema } from '../middlewares/validate-schema'
import { loginSchema, registerSchema } from '../schemas/auth.schema'
import { hashPassword } from '../middlewares/hash-password'

const authRouter = Router()

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
authRouter.post(
  '/register',
  validateSchema(registerSchema, 'body'),
  hashPassword,
  register
)

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Validation error
 */
authRouter.post('/login', validateSchema(loginSchema, 'body'), login)

export default authRouter
