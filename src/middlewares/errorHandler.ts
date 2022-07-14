import { NextFunction, Request, Response } from 'express'
import BaseError from '@/providers/errors/baseError'

const errorHandler = (
  error: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  return res.status(error.status ?? 400).json({
    name: error.name ?? 'Error',
    message: error.message
  })
}

export default errorHandler
