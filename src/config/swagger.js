const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi   = require('swagger-ui-express');


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API CRUD Générique',
      version: '1.0.0',
      description: 'Auth + CRUD produits avec soft-delete et upload d’images'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            name: {
              type: 'string'
            },
            description: {
              type: 'string',
              nullable: true
            },
            price: {
              type: 'number'
            },
            imageUrl: {
              type: 'string',
              format: 'uri',
              description: 'URL de l’image sur Cloudinary'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        ProductInput: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            name: {
              type: 'string'
            },
            description: {
              type: 'string',
              nullable: true
            },
            price: {
              type: 'number'
            },
            image: {
              type: 'string',
              format: 'binary',
              description: 'Fichier image à uploader'
            }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js']
};


const swaggerSpec = swaggerJsDoc(options);
module.exports = { swaggerUi, swaggerSpec };
