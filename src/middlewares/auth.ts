import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { User } from '../models/user'
import { ApiCode, ApiResponse } from '../types/api-response.type'

export const auth = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      code: ApiCode.UNAUTHORIZED,
      details: {
        token: ['Invalid or expired authorization token'],
      },
    })
  }

  const [type, token] = authHeader.split(' ')
  if (type != 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      code: ApiCode.UNAUTHORIZED,
      details: {
        token: ['Invalid or expired authorization token'],
      },
    })
  }

  try {
    const payload = jwt.verify(token, env.ACCESS_JWT_SECRET) as { sub: string }
    const user = await User.findOne({ _id: payload.sub })
    if (!user) {
      return res.status(401).json({
        success: false,
        code: ApiCode.UNAUTHORIZED,
        details: {
          token: ['Invalid or expired authorization token'],
        },
      })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      code: ApiCode.UNAUTHORIZED,
      details: {
        token: ['Invalid or expired authorization token'],
      },
    })
  }
}
