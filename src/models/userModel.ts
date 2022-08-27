import mongoose, { Document, Schema } from 'mongoose'
import validator from 'validator'
import brcypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

interface User extends Document {
  resetPasswordExpire: number
  resetPasswordToken: string
  getJWTToken(): any
  email: string
  password: string
  name: string
}
interface User extends Document {
  role: {
    type?: String
    default?: 'user'
  }
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, 'Please Enter your Name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid e-mail'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [8, 'Password should have greater than 8 characters'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
  },
  url: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await brcypt.hash(this.password, 10)
})

//JWT Token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}
// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await brcypt.compare(enteredPassword, this.password)
}

// Generating password reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hashing and adding to userSchema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

  return resetToken
}

const User = mongoose.model('user', userSchema)
export default User
