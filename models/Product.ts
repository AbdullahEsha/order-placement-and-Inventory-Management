import mongoose from 'mongoose'
import { TProduct } from '../types'
const { Schema, model } = mongoose

const productSchema = new Schema<TProduct>(
  {
    sku: {
      type: String,
      required: [true, 'Please add a sku'],
      trim: true,
      unique: true,
    },
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
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    ragularPrice: {
      type: Number,
      required: [true, 'Please add Ragular Price'],
    },
    salePrice: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    variant: [
      {
        color: {
          type: String,
          required: [true, 'Please add a color'],
        },
        quantity: {
          type: Number,
          required: [true, 'Please add a quantity'],
        },
        size: [
          {
            type: String,
            trim: true,
          },
        ],
        images: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],
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
    // toObject: { virtuals: true },
    // toJSON: { virtuals: true },
  },
)

// vartual populate review in product model
// productSchema.virtual('review', {
//   ref: 'Review',
//   localField: '_id',
//   foreignField: 'product',
//   justOne: false,
// })

export const Product = model<TProduct>('Product', productSchema)
