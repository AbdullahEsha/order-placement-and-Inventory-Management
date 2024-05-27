declare global {
  namespace Express {
    interface Request {
      user?: TUser
    }
  }
}

import mongoose from 'mongoose'

export type TUser = {
  _id?: string
  name: string
  email: string
  password: string
  role?: 'admin' | 'user' | 'superadmin'
  domain?: mongoose.Schema.Types.ObjectId
  updatedAt?: Date
  createdAt?: Date
}

// type for user save method
export type TUserAdd = {
  save(): TUserAdd | PromiseLike<TUserAdd>
  name: string
  email: string
  password: string
  role?: 'admin' | 'user' | 'superadmin'
  domain?: mongoose.Schema.Types.ObjectId
}
