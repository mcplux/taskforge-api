import swaggerJSDoc from 'swagger-jsdoc'

const swaggerConfig = swaggerJSDoc({
  definition: {
    info: {
      title: 'TaskForge API',
      version: '1.0.0',
      description: 'TaskForge API documentation',
    },
  },
  apis: ['src/routers/**/*.ts'],
})

export default swaggerConfig
