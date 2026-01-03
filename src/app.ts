import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db'
import router from './routers'

const app = express()

connectDB()
app.use(cors())
app.use(express.json())
app.use('/api', router)

export default app
