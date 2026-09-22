import express from "express";
import colors from "colors";
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Conexion a la base de datos
export async function connectDB() {
    try {
        await db.authenticate();
        await db.sync();
    } catch (error) {
        console.log(colors.bgRed.bold("No se pudo conectar a la base de datos"));
        console.error(error);
    }
}

connectDB();

const server = express();

// Configuración de CORS flexible y segura
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        // Normaliza la variable de entorno quitando barras finales
        const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, "");

        const whitelist = [
            frontendUrl,
            'http://localhost:5173',
            'http://localhost:3000'
        ].filter(Boolean); // Elimina valores undefined si no existen

        // Permite peticiones sin origin (Postman, Swagger UI, scripts server-side)
        if (!origin || process.argv.includes('--api')) {
            return callback(null, true);
        }

        const isWhitelisted = whitelist.includes(origin);
        const isVercelDomain = origin.endsWith('.vercel.app');

        if (isWhitelisted || isVercelDomain) {
            callback(null, true);
        } else {
            // Se pasa 'false' para responder con denegación limpia sin romper el server (evita HTTP 500)
            callback(null, false);
        }
    },
    credentials: true
};

// Middlewares
server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan('dev'));

// Rutas de la API
server.use('/api/products', router);

// Documentación Swagger
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;