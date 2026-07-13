import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    // which conversation...
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required:true
    },

    // who sent it ...
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


    // message Content..
    text:{
        type: String,
        default:''

    },

    // message type...
    type: {
        type: String,
        enum: ['text','image','file'],
    },


    // file/ image url...
    fileUrl:{
        type: String,
        default:''
    },

    // read status...
    isRead:{
        type: Boolean,
        default: false
    },

    readAt: { 
        type: Date
    }
},{timestamps:true})


export default mongoose.model('Message',messageSchema)