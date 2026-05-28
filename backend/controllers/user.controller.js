import User from '../models/user.model.js'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'

// helper to generate otp....
const generateOTP = ()=> Math.floor(100000+ Math.random()*900000).toString()


//post /api/user/register....

export const register = async(req,res)=>{
    const {name,email,password,role}= req.body

    const existing = await User.findOne({email})
    if(existing) return res.status(400).json({message:'Email already registerd'})
     
        
    const otp = generateOTP()
    const otpExpire = new Date(Date.now()+10*60*1000) // 10 minutes

    const user = await User.create({name,email,password,role,otp,otpExpire})

    await sendEmail({
        to:email,
        subject:'Verify your fluffyFriend account',
        html: `<h2>Your OTP is <b>${otp}</b>. Valid for 10 minutes.</h2>`
    })
    res.status(201).json({message:'OTP sent to your email...'})


}

// post method /api/user/verifyOTP...
export const verifyOTP= async (req,res)=>{
    const {email,otp}= req.body
    
    const user = await User.findOne({email})
    if(!user)  return res.status(404).json({message:"user not found"})
    if(user.otp !== otp)  return res.status(400).json({message:"Invalid otp"})   
    if(user.otpExpire<Date.now())  return res.status(400).json({message:'otp expired'})
    
        user.isVerfied=true 
        user.otp=undefined
        user.otpExpire=undefined

        await user.save()

        const token = generateToken(user._id)
        res.json({token,user:{id:user._id,name:user.name,email:user.email,role:user.role}})

    }   

    // post /api/user/login...
    
