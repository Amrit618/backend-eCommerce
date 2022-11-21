import { Router, Request, Response, NextFunction } from 'express'
import userController from '../controllers/userController'

const userRoute = Router()
userRoute.post('/register', userController.registerUser)
userRoute.post('/login', userController.loginUser)
userRoute.get('/logout', userController.logOut)

export default userRoute