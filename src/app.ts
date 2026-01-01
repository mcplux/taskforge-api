import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db'

const app = express()

connectDB()
app.use(cors())

export default app
