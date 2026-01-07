import { model, Schema } from 'mongoose'

interface IUser {
  name: string
  email: string
  password: string
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser>('User', userSchema)
