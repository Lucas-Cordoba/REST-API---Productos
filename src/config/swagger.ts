//informacion general de nuestra api


import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products / Operaciones de API relacionadas con productos'
            }
        ],
        info: {
            title: 'Rest API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs products'
        }
    },
    apis: [ //donde se van a encontrar los endpoints que vamos a documentar
        './src/router.ts' //si tenemos mas archivos ponemos coma y agregamos las rutas

    ]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link img {
            display: none; /* Oculta el logo por defecto de Swagger */
        }
        .topbar-wrapper .link {
            content: "";
            background-image: url('/logo_swagger.jpg');
            background-size: contain;
            background-repeat: no-repeat;
            height: 60px;
            width: 200px;
        }
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: 'Documentacion Rest API Express / TypeScript'
};
export default swaggerSpec
export {
    swaggerUiOptions
}