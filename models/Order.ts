import mongoose from 'mongoose'
import { TOrder } from '../types'

const { Schema, model } = mongoose

const orderSchema = new Schema<TOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add a user'],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Please add a product'],
        },
        quantity: {
          type: Number,
          required: [true, 'Please add a quantity'],
          default: 0,
        },
      },
    ],
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon',
    },
    deliveryStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered'],
      default: 'pending',
    },
    deliveryCharge: {
      type: Number,
      required: [true, 'Please add a delivery charge'],
      default: 0,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
        required: [true, 'Please add a city'],
      },
      postalCode: {
        type: String,
        required: [true, 'Please add a postal code'],
      },
      details: {
        type: String,
        required: [true, 'Please add details'],
      },
    },
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Domain',
      required: [true, 'Please add a domain'],
    },
  },
  {
    timestamps: true,
  },
)

export const Order = model<TOrder>('Order', orderSchema)
