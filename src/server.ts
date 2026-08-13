import express from "express";
import colors from "colors";
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
import router from "./router";
import db from "./config/db";

//Conexion a la base de datos
export async function connectDB() {
    try{
        await db.authenticate() //con esto nos conectamos a la base de datos
        db.sync() //con esto sincronizamos la base de datos, es decir, creamos las tablas si no existen
        // console.log(colors.blue.bold("Conexion exitosa a la base de datos"))
    }catch(error){
        // console.log(error)
        console.log(colors.bgRed.bold("No se pudo conectar a la base de datos"))
        console.error(error);
    }
}

connectDB() //llamamos a la funcion para conectarnos a la base de datos

//Instancia de express
const server = express(); //sobre este server se van a crear las rutas y los middlewares


//Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function (origin, callback ) { //origin es quien lo envia, callback es el que me permite o niega la conexion

        if(origin === process.env.FRONTEND_URL){
            callback(null, true) //primer parametro el error si es que hay y segundo si permite o no
        }else{

             callback(new Error('Error de CORS'))
        }



    } //el origen es lo que me esta enviando la peticion, es quien me esta enviando la peticion
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json()) //con esto le decimos a express que vamos a recibir datos en formato json

//TIPOS DE OPCIONES DE MORGAN
server.use(morgan('dev')) //estas opciones nos dan un detalle de las peticiones, dev me da status, segundos que tardee
// server.use(morgan('combined')) //combined me da algo mas detallado, nos viene el tipo y a que url fue, status, navegador, etc
// server.use(morgan('common')) //Hora, tipo de peticion, url a la que fue, etc
// server.use(morgan('short')) //status, tipo de peticion, y url, etc
// server.use(morgan('tiny')) //tipo de peticion, url, status



server.use('/api/products', router)//nmo es muy flexible, es para decirle a nuestro server que use el router que creamos en router.ts para manejar las rutas de nuestra aplicacion

//DOCS

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions)) //nos da el cliente Express y nos da una url para la docs, y le pasamos el Spec que es la documentacion





//Routing
// server.post('/', (req, res) => {  //req es la peticion que hace el cliente y res es la respuesta que le vamos a dar


//     // const auth = true; //esta variable es para simular si el usuario esta logueado o no
//     // const datos = [
//     //     {id:1, nombre: "Juan", edad: 30},
//     //     {id:2, nombre: "Maria", edad: 25},
//     //     {id:3, nombre: "Pedro", edad: 35}
//     // ]
//     //     res.send(datos) //con send le enviamos la respuesta al cliente
//     //     //en vez de send tambien podemos usar json para enviar un objeto json al cliente


  
// })



//Nuestro navegador solo admite GET y POST, para poder usar los otros metodos HTTP necesitamos axios o fetch,  usar un cliente como Postman o Thunder Client
export default server;


//los server.use son middlewares