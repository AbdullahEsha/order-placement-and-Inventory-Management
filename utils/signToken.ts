import jwt from 'jsonwebtoken'
import { TUser } from '../types'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../envSetup'

export const signToken = (user: TUser) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      domain: user.domain,
    },
    JWT_SECRET!,
    {
      expiresIn: JWT_EXPIRES_IN,
    },
  )
}
