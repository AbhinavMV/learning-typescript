import express from 'express'
import authRoutes from './routes/auth'

const app = express()

app.use(express.json())
app.use('/auth',authRoutes)
app.get('/',(req,res)=>res.send('Hello World'))

app.listen(8000,()=>{
    console.log('Listening to Port 8000')
})