import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies

  if (!token) {
    return next(new Error('Please login to access'))
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET as string)

  req.user = await User.findById(decodedData)

  next()
}

export default { isAuthenticatedUser }
