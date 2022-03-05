import express from 'express'
import authRoutes from './routes/auth'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to mongodb')
    const app = express()

    app.use(express.json())
    app.use('/auth', authRoutes)

    app.get('/', (req, res) => res.send('Hello World'))

    app.listen(8000, () => {
      console.log('Listening to Port 8000')
    })
  })
  .catch(() => {
    throw new Error()
  })
