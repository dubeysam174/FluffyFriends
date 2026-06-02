import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({


    // who is involved..... means basically pet Owner....
    petOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },

    vet:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Vet',
        required:true
    },

    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },

    // appointment details ....
    date:{
        type: Date,
        required: true
    },

    slot: {
        type: String,
        required: true
    },

    // status...
    status: { 
        type: String,
        enum: ['pending', 'confirmed','cancelled','completed'],
        default: 'pending'
    },

    // type...
    type:{
        type: String,
        enum: ['inPerson','online'],
        default : 'inPerson'
    },


    // reason and notes...
    reason: {
        type: String,
        default: ''
    },

    notes: { 
        type: String,
        default: ''
    },

    // prescription (after appointment)
    prescription :{
        medicines: [{type: String}],
        instructions:{type: String,default: ''},
        followUpDate: {type:Date}
    },


    // payment...
    fee:{
        type: Number,
        default:0
    },

    isPaid: {
        type: Boolean,
        default: false
    }


},{timestamps:true})


export default mongoose.model('Appointment',appointmentSchema)