import mongoose from 'mongoose' // establishing connection with mongodb


const connectDB= async()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`/n MongoDB Connected !! DB Host: ${connectionInstance.connection.host}`)
    }
    catch (error){
        console.log("MONGODB connection FAILED",error)
        process.exit(1)
                
    }
}

export default connectDB