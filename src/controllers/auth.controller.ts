import { Request, Response } from 'express'
import { MongoServerError } from 'mongodb'
import { registerInput } from '../schemas/auth.schema'
import { User } from '../models/user'

export const register = async (
  req: Request<{}, {}, registerInput>,
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
