import { Domain } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TDomain } from '../types'
import { AppError, catchAsync } from '../utils'

// Create Domain
const createDomain = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, subDomain, userLimit, productLimit, status } = req.body

    const domainData: TDomain = {
      name,
      subDomain,
      userLimit,
      productLimit,
      status,
    }

    // create new domain
    const domain = await Domain.create(domainData)

    if (!domain) {
      return next(new AppError('Domain not created', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Domain created successfully',
      data: domain,
    })
  },
)

const getAllDomains = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const domains = await Domain.find()

    if (!domains) {
      return next(new AppError('No domains found', 404))
    }

    res.status(200).json({
      status: 'success',
      results: domains.length,
      data: domains,
    })
  },
)

// get domain by id
const getDomain = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const domainId = req.params.id
    const domain: TDomain | null = await Domain.findById(domainId)

    if (!domain) {
      return next(new AppError('Domain not found! 🔴', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Domain found',
      data: domain,
    })
  },
)

// update domain by id
const updateDomain = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const domainId = req.params.id
    const domain: TDomain | null = await Domain.findByIdAndUpdate(
      domainId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!domain) {
      return next(new AppError('Domain not updated! 🔴', 400))
    }

    res.status(200).json({
      status: 'success',
      message: 'Domain updated successfully',
      data: domain,
    })
  },
)

// delete domain by id
const deleteDomain = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const domainId = req.params.id
    const domain = await Domain.findByIdAndDelete(domainId)

    if (!domain) {
      return next(new AppError('Domain not found 🔴', 404))
    }

    res.status(204).json({
      status: 'success',
      message: 'Domain deleted successfully',
      data: null,
    })
  },
)

export { createDomain, getAllDomains, getDomain, updateDomain, deleteDomain }
