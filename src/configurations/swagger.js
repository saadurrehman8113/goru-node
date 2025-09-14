import swaggerJSDoc from 'swagger-jsdoc';
import config from './env.js';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Goru API',
    version: '1.0.0'
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api`,
      description: 'Local server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.js', './src/controllers/**/*.js', './src/models/**/*.js']
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
