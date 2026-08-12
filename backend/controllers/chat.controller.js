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
export const getMyConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    participants: req.user._id,
    isActive: true,
  })
    .populate('participants', 'name email avatar role')
    .sort({ lastMessageTime: -1 });

  // ✅ Add an explicit "otherParticipant" per conversation, computed
  // relative to the logged-in user — no more guessing participants[0]
  const shaped = conversations.map((conv) => {
    const other = conv.participants.find(
      (p) => p._id.toString() !== req.user._id.toString()
    );

    return {
      ...conv.toObject(),
      otherParticipant: other || null,
    };
  });

  res.json({
    success: true,
    count: shaped.length,
    conversations: shaped,
  });
});


// GET  /api/chat/:conversationId/messages
export const getMessages = asyncHandler(async(req,res)=>{
    const conversation = await Conversation.findById(req.params.conversationId)

    if(!conversation) return res.status(404).json({
        success:false,
        message: 'conversation not found'
    })

    // check user is participant or not..
    const isParticipant = conversation.participants
        .map(p=>p.toString())
        .includes(req.user._id.toString())

    if(!isParticipant) return res.status(403).json({
        success:false,
        message: 'not authorized to view this conversation'
    })

    const messages = await Message.find({
        conversation: req.params.conversationId
    })
    .populate('sender','name avatar')
    .sort({createdAt:1})


    // mark messages as read..
    await Message.updateMany(
        {
            conversation: req.params.conversationId,
            sender:{$ne: req.user._id},
            isRead: false
        },
        {
            isRead:true,
            readAt: new Date()
        }
    )

    res.json({
        success: true,
        count: messages.length,
        messages
    })
})


// POST /api/chat/:conversationId/message
export const sendMessage = asyncHandler(async(req,res)=>{
    const {text,type,fileUrl}=req.body


    if(!text && !fileUrl) return res.status(400).json({
        success:false,
        message: 'message text or file is required'
    })

    const conversation=await Conversation.findById(req.params.conversationId)

    if(!conversation) return res.status(404).json({
        success:false,
        message: 'Conversation not found'
    })

    const isParticipant= conversation.participants
    .map(p=> p.toString())
    .includes(req.user._id.toString())

    if(!isParticipant) return res.status(403).json({
        success:false,
        message: 'not authorized' 
    })

    const message= await Message.create({
        conversation: req.params.conversationId,
        sender: req.user._id,
        text: text || '',
        type: type || 'text',
        fileUrl: fileUrl || ''
    })

    //update conversation preview...
    conversation.lastMessage = text || 'Sent a file'
    conversation.lastMessageTime= new Date()
    await conversation.save()

    res.status(201).json({
        success: true,
        message
    })


})



