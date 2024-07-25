// swagger.js
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
                url: 'http://localhost:5000/',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], // Caminho para os arquivos de rotas e modelos
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
