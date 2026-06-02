import mongoose from 'mongoose'



const vetSchema= new mongoose.Schema({

    // linked user....
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        unique: true
    },


    // clinic information.... heere..
    clinicName:{
        type: String,
        required: true,
        trim: true
    },

    address: {
        type: String,
        required:true
    },
    city:{
        type:String,
        required: true
    },

    bio:{
        type: String,
        default: ''
    },

    specializations:[{
        type: String,
        enum: ['dog','cat','bird','rabbit','fish','reptile','other']              
    }],
    // experience and fees....
    experience:{
        type:Number,
        default:0
    },
    consultationFee:{
        type: Number,
        default:0
    },

    // availability...
    availableDays:[
        {
            type:String,
            enum:['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
        }
    ],

    availableSlots:[
        {
            time: {type:String}, // 10.00 am
            isBooked:{type:Boolean,default:false}
        }
    ],

    // location (geoJSON for nearby search)...
    location:{
        type:{
            type:String,
            enum:['Point'],
            default:'Point'
        },

        coordinates:{
            type:[Number],
            default:[0,0]  // [longitude,latitude]

        }
    },

    // photos...
    clinicPhotos:[
        {type:String} // cloudinary comes later here....
    ],

    // ratings....
    rating:{
        type:Number,
        default:0
    },

    totalRatings:{
        type:Number,
        default:0
    },

    // verfication...
    verficationStatus:{
        type:String,
        enum: ['pending','approved','rejected'],
        default:'pending'
    },

    isAvailable:{
        type:Boolean,
        default:true
    }

},{timestamps:true})
