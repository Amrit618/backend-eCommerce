import { NextFunction, Request, Response } from 'express'

import { Error } from 'mongoose'
import User from '../models/userModel'
import sendToken from '../util/jwtToken'



// Register a user
const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'sample id',
      url: 'profilepicUrl',
    },
  })
  sendToken(user, 201, res)
}

//Login User
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  // checking if user has given password and email
  if (!email || !password) {
    return next(new Error('Please enter email and password'))
  }
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new Error('Invalid email or password'))
  }
  const isPasswordMatched = user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new Error('Invalid email or password'))
  }
  const token = user.getJWTToken()

  sendToken(user, 200, res)
}

// Logout
const logOut = async (req: Request, res: Response, next: NextFunction) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'Logged out',
  })
}

// Forgot Password
const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({
    email: req.body.email,
  })
  if (!user) {
    return next(new Error('User not found'))
  }
  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/password/reset/${resetToken}`
  
  const message= `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email
  then please ignore it`

  try {
    await sendEmail ({
      email: user.email,
      subject: `Password Recovery`,
      

    })
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    })
    
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire= undefined

    await user.save({validateBeforeSave: false})

    return next (new Error (message))
    
  }
}

export default { registerUser, loginUser, logOut }
function sendEmail(arg0: { email: any; subject: any }) {
  throw new Error('Function not implemented.')
}

