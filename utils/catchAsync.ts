// catchAsync is a wrapper function that catches errors and passes them to the next middleware
// It is used in the controllers to catch any errors that are thrown
//
import { Request, Response, NextFunction } from 'express'
import { TAsyncFunction } from '../types'

export const catchAsync = (func: TAsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    func(req, res, next).catch(next)
  }
}
