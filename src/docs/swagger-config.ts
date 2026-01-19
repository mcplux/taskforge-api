import swaggerJSDoc from 'swagger-jsdoc'
import { env } from '../config/env'

const sourceDir = env.NODE_ENV === 'production' ? 'dist' : 'src'

const swaggerConfig = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TaskForge API',
      version: '1.0.0',
      description: 'TaskForge API documentation',
    },
    components: {
      securitySchemes: {
        auth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [`${sourceDir}/routers/**/*.{js,ts}`, `${sourceDir}/docs/**/*.{js,ts}`],
})

export default swaggerConfig
