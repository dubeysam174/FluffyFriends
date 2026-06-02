import mongoose from 'mongoose'

const petSchema = new mongoose.Schema({
    // owner pet...
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    // basic info....
    name: {
        type:String,
        required: true,
        trim: true
    },

    species:{
        type:String,
        required:true,
        enum: ['dog','cat','bird','rabbit','fish','reptile','other']
    },

    breed:{
        type:String,
        defalut:''
    },

    age:{
        type: Number,
        defalult:0
    },

    gender: {
        type:String,
        enum: ['Male','Female','Unknown'],
        default: 'Unknown'
    },

    weight:{
        type: Number,
        default:0
    },

    // photos...
    photo: {
        type:String,
        default: ''  // cloudinary will come here (url)

    },

    // medical History ....
    vaccinations:[
        {
            name: {type: String},
            date: {type: Date},
            nextDue: {type:Date}
        }
    ],


    medicalHistory: [
        {
            condition: {type:String},
            diagnoseOn: {type: Date},
            treatment: {type:String},
            notes: {type: String},
        }
    ],
     allergies: [
    {
      type: String
    }
  ],
  currentMedications: [
    {
      name:     { type: String },
      dosage:   { type: String },
      startDate:{ type: Date }
    }
  ],

  // extra notess.....
  notes:{
    type:String,
    default:''
  },

  isActive:{
    type:Boolean,
    default: true
  }



},{timestamps:true})


export default mongoose.model('Pet',petSchema)