import { Request, Response } from 'express'
import { MongoServerError } from 'mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { LoginInput, RegisterInput } from '../schemas/auth.schema'
import { User } from '../models/user'
import { env } from '../config/env'

export const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response
) => {
  try {
    const user = await User.create({ ...req.body })

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: `User with email ${req.body.email} already exists`,
      })
    }

    console.log('Error registering an user:', error)

    return res.status(500).json({
      success: false,
      error: 'Something went wrong',
    })
  }
}

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credencials',
      })
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credencials',
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
      data: {
        user,
        accessToken,
      },
    })
  } catch (error) {
    console.log('Error loging in user:', error)

    return res.status(500).json({
      success: false,
      error: 'Something went wrong',
    })
  }
}
