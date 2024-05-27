import { Color } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TColor } from '../types'
import { catchAsync, AppError } from '../utils'

// get all colors
const getAllColors = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const colors: TColor[] = await Color.find().populate('domain')
    if (!colors) {
      return next(new AppError('No colors found', 404))
    }
    res.status(200).json({
      status: 'success',
      message: 'All colors',
      data: colors,
    })
  },
)

// create color
const createColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const color: TColor = await Color.create(req.body)

    if (!color) {
      return next(new AppError('Color not created', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Color created',
      data: color,
    })
  },
)

// get color by id
const getColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const color: TColor | null = await Color.findById(req.params.id)

    if (!color) {
      return next(new AppError('No color found! 🔴', 404))
    }

    res.status(200).json({ color, success: true, message: 'Color found' })
  },
)

// update color by id
const updateColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const colorId = req.params.id
    const color = await Color.findByIdAndUpdate(colorId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!color) {
      return next(new AppError('Color not updated! 🔴', 400))
    }

    res.status(200).json({
      status: 'success',
      message: 'Color updated successfully',
      data: color,
    })
  },
)

// delete color by id
const deleteColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const colorId = req.params.id
    const color = await Color.findByIdAndDelete(colorId)

    if (!color) {
      return next(new AppError('Color not found! 🔴', 404))
    }

    res.status(204).json({
      status: 'success',
      message: 'Color deleted successfully',
      data: null,
    })
  },
)

export { getAllColors, createColor, getColor, updateColor, deleteColor }
