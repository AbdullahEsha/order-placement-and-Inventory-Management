import mongoose from 'mongoose'

type TOrderProduct = {
  product: mongoose.Schema.Types.ObjectId
  quantity: number
}

export type TOrder = {
  _id?: string
  user: mongoose.Schema.Types.ObjectId
  products: TOrderProduct[]
  coupon: mongoose.Schema.Types.ObjectId
  deliveryStatus: string
  deliveryCharge: number
  address: {
    street?: string
    city: string
    postalCode: string
    details: string
  }
  domain: mongoose.Schema.Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}
