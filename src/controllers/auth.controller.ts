import { Request, Response } from 'express'
import { MongoServerError } from 'mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { LoginInput, RegisterInput } from '../schemas/auth.schema'
import { User } from '../models/user'
import { env } from '../config/env'
import { ApiCode, ApiResponse } from '../types/api-response.type'
import { getUserResponse, UserResponse } from '../utils/get-user-response'

export const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response<ApiResponse<{ user: UserResponse }>>
) => {
  try {
    const user = await User.create({ ...req.body })

    res.status(201).json({
      success: true,
      code: ApiCode.USER_CREATED,
      data: { user: getUserResponse(user) },
    })
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return res.status(400).json({
        success: false,
        code: ApiCode.USER_ALREADY_EXISTS,
        details: {
          email: [`User with email ${req.body.email} already exists`],
        },
      })
    }

    console.log('Error registering an user:', error)

    return res.status(500).json({
      success: false,
      code: ApiCode.INTERNAL_ERROR,
    })
  }
}

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response<ApiResponse<{ user: UserResponse; accessToken: string }>>
) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        code: ApiCode.INVALID_CREDENTIALS,
      })
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        code: ApiCode.INVALID_CREDENTIALS,
      })
    }

    // Create token
    const accessToken = jwt.sign(
      {
        sub: user._id,
      },
      env.ACCESS_JWT_SECRET,
      {
        expiresIn: '1w',
      }
    )

    return res.status(200).json({
      success: true,
      code: ApiCode.USER_AUTHENTICATED,
      data: {
        user: getUserResponse(user),
        accessToken,
      },
    })
  } catch (error) {
    console.log('Error logging in user:', error)

    return res.status(500).json({
      success: false,
      code: ApiCode.INTERNAL_ERROR,
    })
  }
}
