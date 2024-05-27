import mongoose from 'mongoose'
import { TCategory } from '../types'

const { Schema, model } = mongoose

const categorySchema = new Schema<TCategory>(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please add a slug'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
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

export const Category = model<TCategory>('Category', categorySchema)
