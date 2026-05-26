import mongoose from 'mongoose' // establishing connection with mongodb
import { DB_NAME } from '../constants.js'  // for using db name from constants

const connectDB= async()=>{
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`/n MongoDB Connected !! DB Host: ${connectionInstance.connection.host}`)
    }
    catch (error){
        console.log("MONGODB connection FAILED",error)
        process.exit(1)
                
    }
}

export default connectDB