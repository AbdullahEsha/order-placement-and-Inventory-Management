import { Review } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TReview } from '../types'
import { catchAsync, AppError } from '../utils'

// Create Review
const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // create new review
    const review = await Review.create(req.body as TReview)

    if (!review) {
      return next(new AppError('Review not created', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Review created successfully',
      data: review,
    })
  },
)

// get all reviews
const getAllReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await Review.find().populate('product').populate('user')

    if (!reviews) {
      return next(new AppError('No reviews found', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'All reviews',
      data: reviews,
    })
  },
)

// get review by id
const getReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.id
    const review = await Review.findById(reviewId)

    if (!review) {
      return next(new AppError('Review not found', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Review found',
      data: review,
    })
  },
)

// update review by id
const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.id
    const review = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!review) {
      return next(new AppError('Review not found', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Review updated successfully',
      data: review,
    })
  },
)

// delete review by id
const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.id
    const review = (await Review.findByIdAndDelete(reviewId)) as TReview

    if (!review) {
      return next(new AppError('Review not found', 404))
    }

    res.status(204).json({
      status: 'success',
      message: 'Review deleted successfully',
      data: null,
    })
  },
)

export { createReview, getAllReviews, getReview, updateReview, deleteReview }
