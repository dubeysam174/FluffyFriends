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


// hashing the password doing this here because using this keyword we can fetch or refer to schema...
// building custom hook...
userSchema.pre('save',async function (next) {
    if(!this.isModified('password')|| !this.password) return next()
        this.password= await bcrypt.hash(this.password,12)
    next()
    
})


//Compare password method...
userSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

export default mongoose.model('User',userSchema)

