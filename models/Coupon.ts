import mongoose from 'mongoose'
import { TCoupon } from '../types'

const { Schema, model } = mongoose

const couponSchema = new Schema<TCoupon>(
  {
    code: {
      type: String,
      required: [true, 'Please add a code'],
      trim: true,
      unique: true,
      maxlength: [10, 'Code cannot be more than 10 characters'],
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'percentage',
    },
    // if discount type is percentage, then discount should be less than or equal to 100
    discount: {
      type: Number,
      required: [true, 'Please add a discount'],
      validate: {
        validator: function (this: TCoupon, v: number) {
          if (this.discountType === 'percentage') {
            return v <= 100
          }
          return v > 0
        },
        message:
          'Discount should be less than or equal to 100 if discount type is percentage',
      },
    },
    minimumPurchaseAmount: {
      type: Number,
      required: [true, 'Please add a minimum purchase amount'],
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: [true, 'Please add an expiry date'],
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

export const Coupon = model<TCoupon>('Coupon', couponSchema)
