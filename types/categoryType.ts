import mongoose from 'mongoose'

export type TCategory = {
  _id?: string
  title: string
  slug: string
  status: 'active' | 'inactive'
  domain?: mongoose.Schema.Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}
