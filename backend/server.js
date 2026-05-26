import express from 'express'
import http from 'http'

// third party module ....
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// internal modules....
import connectDB from './Config/db.js';


// accessing and loading variables in the main file so every file can access.
dotenv.config({
    path:'./.env'
})  

// creating app&server...
const app    = express();
const server = http.createServer(app);


// middlewares
app.use(express.json({limit:"16kb"})) // for accessing json data.
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// connecting the databaese....
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err)
})




app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))







