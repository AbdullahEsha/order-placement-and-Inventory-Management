import mongoose from 'mongoose'

export type TColor = {
  _id?: string
  primary: string
  secondary: string
  tertiary: string
  quaternary: string
  domain?: mongoose.Schema.Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}
