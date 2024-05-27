import mongoose from 'mongoose'

export type TCoupon = {
  _id?: string
  code: string
  discountType: string
  minimumPurchaseAmount: number
  discount: number
  freeShipping: boolean
  domain: mongoose.Schema.Types.ObjectId
  expiresAt: Date
  createdAt?: Date
  updatedAt?: Date
}
