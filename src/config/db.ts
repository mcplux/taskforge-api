import mongoose from 'mongoose'
import { env } from './env'

export const connectDB = async () => {
  let mongoUri = 'mongodb://'
  mongoUri += `${env.MONGO_USER}:${env.MONGO_PASSWORD}`
  mongoUri += `@${env.MONGO_HOST}:${env.MONGO_PORT}`
  mongoUri += `/${env.MONGO_DB}?authSource=admin`

  try {
    await mongoose.connect(mongoUri)
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error)
    process.exit(1)
  }
}
