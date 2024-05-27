import mongoose from 'mongoose'
import { TReview } from '../types'
const { Schema, model } = mongoose

const reviewSchema = new Schema<TReview>(
  {
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating'],
      default: 0,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Please add a product'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add a user'],
    },
  },
  {
    timestamps: true,
  },
)

export const Review = model<TReview>('Review', reviewSchema)
