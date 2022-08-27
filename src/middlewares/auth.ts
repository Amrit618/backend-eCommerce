import { Request,Response,NextFunction, } from 'express'

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

/* const authorizeRoles = (...roles: any[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error(
          `Role: ${req.user.role} is not allowed to access this resource`
        )
      )
    }
    next()
  }
} */

export default { isAuthenticatedUser }
