import swaggerJSDoc from 'swagger-jsdoc'

const swaggerConfig = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TaskForge API',
      version: '1.0.0',
      description: 'TaskForge API documentation',
    },
  },
  apis: ['src/routers/**/*.ts', 'src/docs/**/*.ts'],
})

export default swaggerConfig
