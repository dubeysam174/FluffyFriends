import { createContext,useContext,useEffect,useState } from "react"
import io from 'socket.io-client'
import {useSelector} from 'react-redux'
import { selectUser } from "./slices/authSlice"


const SocketContext = createContext()

export const SocketProvider = ({children})=>{
    const user = useSelector(selectUser)
    const [socket,setSocket]=useState(null)

    useEffect(()=>{
        if(!user) return 

        const newSocket = io('http://localhost:8080')

        newSocket.on('connect',()=>{
            console.log('socket connected:',newSocket.id)
            newSocket.emit('join',user._id)

        })


        setSocket(newSocket)
        return ()=> newSocket.close()
    },[user])

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = ()=> useContext(SocketContext)