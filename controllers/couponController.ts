import { Request, Response, NextFunction } from 'express'
import { Coupon } from '../models'
import { TCoupon } from '../types'
import { AppError, catchAsync } from '../utils'

// Create Coupon
const createCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // create new coupon
    const coupon = await Coupon.create(req.body as TCoupon)

    if (!coupon) {
      return next(new AppError('Coupon not created 🔴', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Coupon created successfully 🔥',
      data: coupon,
    })
  },
)

// get all coupons
const getAllCoupons = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const coupons = await Coupon.find()

    if (!coupons) {
      return next(new AppError('No coupons found 🔴', 404))
    }

    res.status(200).json({
      status: 'success',
      results: coupons.length,
      data: coupons,
    })
  },
)

// get coupon by id
const getCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const couponId = req.params.id
    const coupon = await Coupon.findById(couponId)

    if (!coupon) {
      return next(new AppError('Coupon not found 🔴', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Coupon found 🔥',
      data: coupon,
    })
  },
)

// update coupon by id
const updateCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const couponId = req.params.id
    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedCoupon) {
      return next(new AppError('Coupon not updated 🔴', 400))
    }

    res.status(200).json({
      status: 'success',
      message: 'Coupon updated successfully 🔥',
      data: updatedCoupon,
    })
  },
)

// delete coupon by id
const deleteCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const couponId = req.params.id
    const deletedCoupon = await Coupon.findByIdAndDelete(couponId)

    if (!deletedCoupon) {
      return next(new AppError('Coupon not deleted 🔴', 400))
    }

    res.status(204).json({
      status: 'success',
      message: 'Coupon deleted successfully 🔥',
      data: null,
    })
  },
)

export { createCoupon, getAllCoupons, getCoupon, updateCoupon, deleteCoupon }
