import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { User } from '../models/user'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'Missing authorization header',
    })
  }

  const [type, token] = authHeader.split(' ')
  if (type != 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      error: 'Invalid authorization format',
    })
  }

  try {
    const payload = jwt.verify(token, env.ACCESS_JWT_SECRET) as { sub: string }
    const user = await User.findOne({ _id: payload.sub })
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
      })
    }
    req.user = user
    console.log('Hello world!')
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token',
    })
  }
}
