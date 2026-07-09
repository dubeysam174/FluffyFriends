import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"
import  { asyncHandler } from "../utils/asyncHandler.js"
import User from "../models/user.model.js"


// post /api/chat/start...
export const startConversation = asyncHandler(async(req,res)=>{
    const {receiverId}=req.body


if(!receiverId) return res.status(400).json({
    success:false,
    message: 'receiverId is required'
})

const receiver= await User.findById(receiverId)
if(!receiver) return res.status(404).json({
    success: false,
    message: 'User not found'
})

// check if conversation already exists..
let conversation = await Conversation.findOne({
    participants:{$all: [req.user._id,receiverId]}
})

// if not then create new one ...
if(!conversation) {
    conversation = await Conversation.create({
        participants: [req.user._id,receiverId]
    })

}

res.status(200).json({
    success:true,
    conversation
})
})

// get /api/chat/conversations...
// in this we are finding and with the help of the populate we are  joinging wtih user and adding image and all
export const getMyConversations = asyncHandler(async(req,res)=>{
    const conversations = await Conversation.find({
        participants:req.user._id,
        isActive:true
    })
    .populate('participants','name email avatar role')
    .sort({lastMessageTime:-1})

    res.json({
        success:true,
        count: conversations.length,
        conversations
    })
})


