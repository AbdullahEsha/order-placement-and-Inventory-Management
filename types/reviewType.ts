import mongoose from 'mongoose'

export type TReview = {
  _id?: string
  description: string
  rating: number
  product?: mongoose.Schema.Types.ObjectId
  user?: mongoose.Schema.Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}
