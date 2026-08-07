// cada vez que finalicen nuestras pruebas se va a limpiar nuestra base de datos
import {exit} from "node:process" //va a detener la ejecucion de un codigo de node.js
import db from '../config/db.js'



const clearDB = async () =>{

    try {
        await db.sync({force: true }) //esto hace que Sequelize elimine (borre) las tablas existentes en la base de datos y las vuelva a crear desde cero con la estructura definida en tus modelos.
        console.log('Datos Eliminados Correctamente')
        exit(0) //se puede poner exit() nomas, el cero ya viene por default
    } catch (error) {
        console.log(error)
        exit(1) //Con cero lo finaliza pero lo que hizo lo hizo bien, si le pongo 1 es que finaliza con errores
    }
}

if(process.argv[2] === '--clear'){ //process y argv se utiliza para leer los argumentos pasados desde la línea de comandos, objeto global de Node.js que proporciona información y control sobre el proceso actual y process.argv: Es un arreglo (array) que contiene todos los argumentos pasados en la terminal al lanzar el programa 
    clearDB()
}


console.log(process.argv)