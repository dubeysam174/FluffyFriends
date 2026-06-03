import mongoose from "mongoose";

const conversationSchema= new mongoose.Schema({

    // participants-> (petOwner + vets)
    participants:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:'User'

        }
    ],

    // last message preview....
    lastMessage: {
        type: String,
        default: ''
    },

    lastMessageTime: {
        type: Date,
        default: Date.now
    },

    // unread count...
    unreadCount: {
        type: Number,
        default:0
    },

    // is Active...
    isActive:{
        type: Boolean,
        default: true
    }
},{timestamps:true})



export default mongoose.model('Conversationn',conversationSchema)