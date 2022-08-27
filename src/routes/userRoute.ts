import { Router, Request, Response, NextFunction } from 'express'
import userController from '../controllers/userController'

const userRoute = Router()
userRoute.post('/register', userController.registerUser)
userRoute.post('/login', userController.loginUser)
userRoute.get('/logout', userController.logOut)
/* userRoute.post('/product/new', userController.createProduct)
userRoute.put('/product/:id', userController.updateProducts)
userRoute.delete('/product/:id', userController.deleteProduct)
userRoute.get('/product/:id', userController.getProductDetails) */

export default userRoute