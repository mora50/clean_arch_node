import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      version: '1.0.0',
      title: 'Finance API',
      description: 'Finance API for control of bills',
    },
  },
  apis: ['./src/main/routes.ts'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Bearer token authentication',
    },
  },
})

export default swaggerOptions
