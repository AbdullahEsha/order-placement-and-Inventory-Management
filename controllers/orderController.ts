import { Request, Response, NextFunction } from 'express'
import { Order } from '../models'
import { TOrder } from '../types'
import { AppError, catchAsync } from '../utils'

// Create Order
const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // create new order
    const order = await Order.create(req.body as TOrder)

    if (!order) {
      return next(new AppError('Order not created', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully. 🚀',
      data: order,
    })
  },
)

// get all orders
const getAllOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find().populate('user').populate('product')

    if (!orders) {
      return next(new AppError('No orders found! 🔴', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'All orders',
      data: orders,
    })
  },
)

// get order by id
const getOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id
    const order = await Order.findById(orderId)

    if (!order) {
      return next(new AppError('Order not found! 🔴', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Order found',
      data: order,
    })
  },
)

// update order by id
const updateOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id
    const order = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!order) {
      return next(new AppError('Order not updated! 🔴', 400))
    }

    res.status(200).json({
      status: 'success',
      message: 'Order updated successfully',
      data: order,
    })
  },
)

// delete order by id
const deleteOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id
    const order = (await Order.findByIdAndDelete(orderId)) as TOrder

    if (!order) {
      return next(new AppError('Order not found! 🔴', 404))
    }

    res.status(204).json({
      status: 'success',
      message: 'Order deleted successfully',
      data: null,
    })
  },
)

export { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder }
