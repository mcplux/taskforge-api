import { IUser } from '../types/user.type'

export interface UserResponse {
  id: string
  name: string
  email: string
}

export const getUserResponse = (user: IUser): UserResponse => ({
  id: user._id,
  name: user.name,
  email: user.email,
})
