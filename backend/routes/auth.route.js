import express from 'express'
import {register,verifyOTP,login,logout,getMe} from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'



const router = express.Router()  // making the instance of the router...

// public routesss.....
router.post('/register',register)
router.post('/verify-otp',verifyOTP)
router.post('/login',login)



// protected routes means you can only access them when you are logged in or authenticated....

router.get('/me',protect,getMe)
router.post('/logout',protect,logout)



export default router