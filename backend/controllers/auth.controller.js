import User from '../models/user.model.js'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'
import { asyncHandler } from '../utils/asyncHandler.js'



//post /api/user/register....

export const register = asyncHandler(async(req,res)=>{
    const {name,email,password,role}= req.body

    if (!name || !email || !password) {
    return res.status(400).json({   
      success: false,
      message: 'Name, email, and password are required' 
    });
  }
    
    const existing = await User.findOne({email})
    if(existing) return res.status(400).json({message:'Email already registered'})
        
        
        // helper to generate otp....
        const otp= crypto.randomInt(100000,999999).toString()
        const otpExpire = new Date(Date.now()+10*60*1000) // 10 minutes
   
           // ✅ Send email FIRST, before creating user
    try {
        await sendEmail({
            to: email,
            subject: 'Verify your account',
            html: `<h2>Your OTP is <b>${otp}</b></h2>`
        })
    } catch (error) {
        console.error('Email error:', error);
        // ✅ Fail early - don't create user if email fails
        return res.status(500).json({
            success: false,
            message: 'Failed to send OTP. Please try again later.'
        });
    }

    const user = await User.create({name,email,password,role,otp,otpExpire})
       res.status(201).json({
        success: true,
        message: 'OTP sent to your email',
        email
    })



})

// post method /api/user/verifyOTP...
export const verifyOTP= asyncHandler(async (req,res)=>{
    const {email,otp}= req.body

     if (!email || !otp) {
        return res.status(400).json({
            success: false,
            message: 'Email and OTP are required'
        })
    }
    
    const user = await User.findOne({email})
    if(!user)  return res.status(404).json({message:"user not found"})
    if(user.otp !== otp)  return res.status(400).json({message:"Invalid otp"})   
    if(user.otpExpire<Date.now())  return res.status(400).json({message:'otp expired'})
    
        user.isVerified=true 
        user.otp=undefined
        user.otpExpire=undefined

        await user.save()

        const token = generateToken(user._id)
        res.json({token,user:{id:user._id,name:user.name,email:user.email,role:user.role}})

    })

    // post /api/user/login...
    export const login = asyncHandler(async (req,res)=>{
        const  {email,password}=req.body

        // ✅ Input validation
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        })
    }


const user = await User.findOne({email}).select('+password') 
 if(!user) return res.status(401).json({
        success: false,
        message:'Invalid credentials'
    })       
        if(!user.isVerified) return res.status(401).json({message: 'verify you email first'})    
        
            const isMatch= await user.matchPassword(password)
            if(!isMatch) return res.status(401).json({message:"invalid credentials"})
            
            const token = generateToken(user._id)
            res.json({token, user:{id:user._id,name:user.name, email:user.email,role:user.role}})

    })    


    // get /api/auth/me
    export const getMe =asyncHandler(async(req,res)=>{
        res.json(req.user)
    })

    //post /api/auth/logout...
    export const logout= asyncHandler( async (req,res)=>{
        res.json({message:'logged out successfully'})
    })
