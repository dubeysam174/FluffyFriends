import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
    // basic info...

    name:{
        type: String,
        required:true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true

    },
    password:{
        type: String,
        minlength:6
    },

    // auth...
    googleId:{
        type:String
    },
    avatar:{
        type:String,
        default:''
    },

    role:{
        type: String,
        enum:['petOwner','vet'],
        default:'petOwner'
    },
    isVerfied:{
        type: Boolean,
        default:false
    },

    // for otp...
    otp:{
        type:String
    },
    otpExpire:{
        type:Date
    },

    //location...
    city:{
        type: String,
        default:''
    },

    // petOwner area...
    pets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Pet"
        }
    ]
},{timestamps:true})

