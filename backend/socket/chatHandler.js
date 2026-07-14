import  Message from '../models/message.model.js'
import Conversation from '../models/conversation.model.js'

const registerChatHandlers= (io,socket,onlineUsers)=>{

    // send message event...
    socket.on('sendMessage',async({conversationId,senderId,receiverId,text})=>{
        try {
            // save message to db...
            const message = await Message.create({
                conversation:conversationId,
                sender: senderId,
                text
            })

            // update conversation last msg preview..
            await Conversation.findByIdAndUpdate(conversationId,{
                lastMessage: text,
                lastMessageTime: new Date()
            })

            //send to receiver if online ...
            const receiverSocketId= onlineUsers.get(receiverId)
            if(receiverId) {
                io.to(receiverSocketId).emit('receiveMessage',message)
                console.log(`message delivered to ${receiverId}`)
            }
            else{
                console.log(`${receiverId} is offline msg saved to db`)
            }

            // confirm to sender...
            socket.emit('messageSent',message)
        } catch (error) {
            console.error('socket msg error',error);
            socket.emit('messageError',{message:'failed to send msgs'})
            
        }
    }
    )
   // typing indicator...
    socket.on('typing',({receiverId,senderName})=>{
        const receiverSocketId=onlineUsers.get(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit('userStoppedTyping')
        }
    })

    // get online status..
    socket.on('checkOnline',({userId})=>{
        const isOnline = onlineUsers.has(userId)
        socket.emit('onlineStatus',{userId,isOnline})
    })
}

export default registerChatHandlers