const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hospital Management API',
            version: '1.0.0',
            description: 'API de Gestão Hospitalar',
        },
        servers: [
            {
                url: 'http://localhost:5000', // Certifique-se de que está usando "http"
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            authAction: {
                JWT: {
                    name: 'JWT',
                    schema: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'Authorization',
                        description: "",
                    },
                    value: "Bearer <JWT>"
                }
            }
        }
    }));
};

module.exports = setupSwagger;
