import { Category } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TCategory } from '../types'
import { AppError, catchAsync } from '../utils'
import slugify from 'slugify'

// Create Category
const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, status, domain } = req.body

    const slug = slugify(title, { lower: true })

    const categoryData: TCategory = {
      title,
      status,
      domain,
      slug,
    }

    // create new category
    const category = await Category.create(categoryData)

    if (!category) {
      return next(new AppError('Category not created 🔴', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Category created successfully 🔥',
      data: category,
    })
  },
)

const getAllCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find().populate('domain')

    if (!categories) {
      return next(new AppError('No categories found 🔴', 404))
    }

    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: categories,
    })
  },
)

// get category by id
const getCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id
    const category = (await Category.findById(categoryId).populate(
      'domain',
    )) as TCategory

    if (!category) {
      return next(new AppError('Category not found 🔴', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Category found',
      data: category,
    })
  },
)

// update category by id
const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id
    const category = await Category.findByIdAndUpdate(categoryId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!category) {
      return next(new AppError('Category not found 🔴', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Category updated successfully',
      data: category,
    })
  },
)

// delete category by id
const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id
    const category = await Category.findByIdAndDelete(categoryId)

    if (!category) {
      return next(new AppError('Category not found 🔴', 404))
    }

    res.status(204).json({
      status: 'success',
      message: 'Category deleted successfully',
      data: null,
    })
  },
)

export {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
}
