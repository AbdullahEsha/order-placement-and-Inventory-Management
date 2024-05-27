import mongoose from 'mongoose'

export type TContact = {
  _id?: string
  email: string
  subject: string
  message: string
  status: 'active' | 'inactive'
  domain: mongoose.Schema.Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}
