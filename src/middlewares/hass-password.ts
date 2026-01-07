import bcrypt from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'
import { registerInput } from '../schemas/auth.schema'

export const hashPassword = async (
  req: Request<{}, {}, registerInput>,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  req.body.password = hashedPassword
  next()
}
