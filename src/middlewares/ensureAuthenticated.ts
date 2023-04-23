import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Unauthorized } from 'http-errors'

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

  const userId = verifyToken(token)

  if (userId) {
    res.locals.userId = userId
    next()
  }
}

const verifyToken = (token: string): string => {
  try {
    const secret = process.env.JWT_SECRET

    const decoded = jwt.verify(token, secret)

    return decoded['id']
  } catch (error) {
    throw new Unauthorized('Invalid token')
  }
}

export { ensureAuthenticated }
