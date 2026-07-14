import {Server} from 'socket.io'
import registerChatHandlers from './chatHandler.js'

// track online users...
// -> map stores userId -> socketId...
const onlineUsers= new Map()

const initSocket = (server)=> {
    const io= new Server(server,{
        cors:{
            origin: process.env.CORS_ORIGIN,
            credentials:true
        }
    })
  
    io.on('connection',(socket)=>{
        console.log(' new socket connected : ',socket.id)

        // user joins - tells server who they are...
        socket.on('join',(userId)=>{
            onlineUsers.set(userId,socket.id)
            socket.userId=userId
            console.log(`user ${userId} is online`)
            console.log('online users:',[...onlineUsers.keys()])
            
        })

        // register chat event handlers...
        registerChatHandlers(io,socket,onlineUsers)

        // user disconnects...
        socket.on('disconnect',()=>{
            if(socket.userId){
                onlineUsers.delete(socket.userId)
                console.log(`User ${socket.userId} went offline`)
            }
        })
    })
       return io
}


export default initSocket