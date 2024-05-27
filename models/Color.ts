import mongoose from 'mongoose'
import { TColor } from '../types'

const { Schema, model } = mongoose

const colorSchema = new Schema<TColor>(
  {
    primary: {
      type: String,
      trim: true,
    },
    secondary: {
      type: String,
      trim: true,
    },
    tertiary: {
      type: String,
      trim: true,
    },
    quaternary: {
      type: String,
      trim: true,
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

export const Color = model<TColor>('Color', colorSchema)
