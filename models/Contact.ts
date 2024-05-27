import mongoose from 'mongoose'
import { isEmail } from 'validator'
import { TContact } from '../types'

const { Schema, model } = mongoose

const contactSchema = new Schema<TContact>(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      trim: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    subject: {
      type: String,
      required: [true, 'Please add a subject'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please add a message'],
      trim: true,
      maxlength: [500, 'Message cannot be more than 500 characters'],
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

contactSchema.path('email').validate(async (email: string) => {
  if (!email.includes('@') || !email.includes('.')) {
    return "Email should contain '@' and '.'"
  }
})

export const Contact = model<TContact>('Contact', contactSchema)
