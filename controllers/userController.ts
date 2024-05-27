import { User } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TUser, TUserAdd } from '../types'
import { catchAsync, AppError } from '../utils'
import bcryptjs from 'bcryptjs'

// get all users
const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users: TUser[] = await User.find().populate('domain')
    if (!users) {
      return next(new AppError('No users found', 404))
    }
    res.status(200).json({
      status: 'success',
      message: 'All users',
      data: users,
    })
  },
)

// get single user
const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: TUser | null = await User.findById(req.params.id)
    if (!user) {
      return next(new AppError('No user found', 404))
    }
    res.status(200).json({ user, success: true, message: 'User found 🔥' })
  },
)

// add user
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role, domain }: TUser = req.body

    const checkUser: TUser | null = await User.findOne({ email })

    if (checkUser) {
      return next(new AppError('User already exists', 400))
    }

    //encrypt the password
    const encPassword = await bcryptjs.hash(password, 12)

    const user = await User.create({
      name,
      email,
      password: encPassword,
      role,
      domain,
    })

    if (!user) {
      return next(new AppError('User not created', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: user,
    })
  },
)

// update user
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      body,
      params: { id },
    } = req
    const user: TUserAdd | null = await User.findById(id)

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    user.name = body.name || user.name
    user.email = body.email || user.email
    user.password = body.password || user.password

    const updatedUser: TUserAdd = await user.save()

    res.status(200).json({
      message: 'User updated',
      user: updatedUser,
      success: true,
    })
  },
)

// delete user
const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedUser: TUser | null = await User.findByIdAndDelete(
      req.params.id,
    )

    if (!deletedUser) {
      return next(new AppError('User not found', 404))
    }

    res.status(200).json({
      message: 'User deleted',
      user: deletedUser,
      success: true,
    })
  },
)

export { getAllUsers, getUser, createUser, updateUser, deleteUser }
