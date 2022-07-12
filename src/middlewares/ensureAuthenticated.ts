import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Unauthorized from '../providers/errors/unauthorized'

const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization

  const token = authHeader?.split(' ')[1]

  if (!token) {
    throw new Unauthorized()
  }

  try {
    const secret = process.env.JWT_SECRET

    jwt.verify(token, secret)

    next()
  } catch (error) {
    throw new Unauthorized('Invalid token')
  }
}

export { ensureAuthenticated }
