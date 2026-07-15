import express      from 'express'
import http         from 'http'
import dotenv       from 'dotenv'
import cookieParser from 'cookie-parser'
import cors         from 'cors'

// ── Internal modules 
import connectDB            from './Config/db.js'
import authRoutes           from './routes/auth.route.js'
import vetRoutes from './routes/vet.route.js'
import petRoutes from './routes/pet.route.js'
import appointmentRoutes from './routes/appointment.route.js'
import chatRoutes from './routes/chat.route.js'
import { notFound,
         errorHandler }     from './middleware/error.Middleware.js'
import initSocket from './socket/index.js'

// ── Environment variables 
dotenv.config({ path: './.env' })

// ── App & Server 
const app    = express()
const server = http.createServer(app)

// calling socketio function here...
initSocket(server)

// ── Middleware
app.use(cors({
  origin:      process.env.CORS_ORIGIN,
  credentials: true
}))
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

// ── Routes 
app.use('/api/auth', authRoutes)
app.use('/api/vets', vetRoutes)
app.use('/api/pets',petRoutes)
app.use('/api/appointments',appointmentRoutes)
app.use('/api/chat', chatRoutes)


// ── Error handling 
app.use(notFound)
app.use(errorHandler)


// ── Connect DB then start server 
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 8000}`)
    })
  })
  .catch((err) => {
    console.log('MongoDB connection failed', err)
  })