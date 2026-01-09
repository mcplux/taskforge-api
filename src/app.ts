import express from 'express'
import cors from 'cors'
import swaggerUiExpress from 'swagger-ui-express'
import { connectDB } from './config/db'
import router from './routers'
import swaggerConfig from './docs/swagger-config'

const app = express()

connectDB()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerConfig))

export default app
