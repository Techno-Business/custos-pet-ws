const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['src/routes.ts']

swaggerAutogen(outputFile, endpointsFiles);