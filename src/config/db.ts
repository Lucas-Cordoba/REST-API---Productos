import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config() //esto es para poder usar las variables de entorno que tenemos en nuestro archivo .env


const db = new Sequelize(process.env.DATABASE_URL!,{

  models: [__dirname + '/../models/*.model.ts'], //esto es para decirle a sequelize que busque los modelos en la carpeta models, y que los cargue automaticamente, para poder usarlos en nuestra aplicacion
  //dirname es una variable que nos da la ruta absoluta de la carpeta donde estamos, y con eso le decimos a sequelize que busque los modelos en la carpeta models, y que los cargue automaticamente
  logging: false, //esto es para decirle a sequelize que no nos muestre los logs de las consultas que hace a la base de datos
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <--- Esto es clave para aceptar el certificado en Render/Cloud
    }
  }
}//,{
    // dialectOptions:{ //son las opciones que le pasamos a la base de datos para poder conectarnos a ella
    //     ssl: {
    //         require: false //esta opcion es para decirle a la base de datos que no necesitamos una conexion segura, ya que render.com nos da una conexion segura por defecto
    //     }
    // }}

    
  )  
//esto es para conectarnos a nuestra base de datos, en este caso estamos usando postgresql, y le pasamos la url de nuestra base de datos, que la podemos obtener desde render.com, donde tenemos nuestra base de datos creada
export default db