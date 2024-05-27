import { logger, AppError } from '../utils'
import { Request, Response, NextFunction } from 'express'

const processRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const correlationId = req.headers['x-correlation-id']
  const requestBody = req.body

  logger.info(
    `${req.originalUrl} - ${req.method} - ${
      req.ip
    } - ${correlationId} - ${JSON.stringify(requestBody)}`,
  )

  next()
}

// create a global error handler middleware
const notFound = (req: Request, res: Response, next: NextFunction) => {
  // handle error for /favicon.ico request from browser to server, we have ico on public folder

  const error = new AppError(`Not found - ${req.originalUrl}`, 404)
  next(error)
}

// create a global error handler middleware
const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const correlationId = req.headers['x-correlation-id']
  const requestBody = req.body

  let statusCode = err.statusCode || 500
  const status = err.status || 'error'
  let { message } = err

  if (err.code === 11000) {
    statusCode = 400
    const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/)[0]
    message = `Duplicate field value: ${value}. Please use another value!`
  }

  // use switch case instead of if else for err.name
  switch (err.name) {
    case 'CastError':
      statusCode = 400
      message = `Invalid ${err.path}: ${err.value}`
      break
    case 'MongoServerError':
      const e = err.stack.split(':')
      message = `${e[1]}`
      break
    case 'ValidationError':
      const errors = Object.values(err.errors).map((el) => el)
      message = `Invalid input data. ${errors.join('. ')}`
      statusCode = 400
      break
    case 'SyntaxError':
      message = `Invalid api request. ${err.message}`
      statusCode = 400
      break
    case 'JsonWebTokenError':
      message = `Invalid token. Please log in again!`
      statusCode = 401
      break
    case 'TokenExpiredError':
      message = `Your token has expired!. Please log in again!`
      statusCode = 401
      break
    case 'ReferenceError':
      statusCode = 500
      break
    default:
      break
  }

  res.status(statusCode).json({
    state: status,
    message,
    stack: err.stack,
  })

  logger.error(
    `${statusCode} - ${status} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${correlationId} - ${err.message} - ${err.stack} `,
  )
}

export { notFound, errorHandler, processRequest }
