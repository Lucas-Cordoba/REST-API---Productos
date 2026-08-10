//PRUEBAS DE JEST

// describe('Nuestro primer test', () => {
//     test('Debe revisar que 1 + 1 sean 2', () =>{
//         expect(1+1).toBe(2) //expect es una funcion de jest que nos permite hacer comparaciones, toBe es un matcher que nos permite comparar valores primitivos
//     }) //se puede usar test o it, es lo mismo verificar en el codigo si ya existe pruebas y usar el que usan
//     //se pueden hacer multiples pruebas dentro de un describe


//     test('Debe revisar que 1 + 1 no sea 3', () =>{
//         expect(1+1).not.toBe(3) //expect es una funcion de jest que nos permite hacer comparaciones, toBe es un matcher que nos permite comparar valores primitivos
//     })

// }) //esta funcion no se importa de ningun lado es de jest y esta de forma global


import  { connectDB } from "../server"; //importamos nuestro servidor para poder hacer pruebas a nuestro servidor
import db from "../config/db";


// describe('GET /api', () => {
//     test('debería devolver una respuesta JSON / should send back a json response', async () => {
//         const res = await request(server).get('/api') //hacemos una peticion get a nuestro servidor

//         expect(res.status).toBe(200) //esperamos que el status de la respuesta sea 200, es decir, que la peticion haya sido exitosa
//         expect(res.headers['content-type']).toMatch(/json/)  //Sirve para confirmar que la API o endpoint está respondiendo adecuadamente en formato JSON
//         expect(res.body.msg).toBe('Desde API') //se fija que lo que hay en msg sea  Desde API
//         //Esto es para acceder al contenido
//         // console.log(res.text)
//         // console.log(res.body.msg) //este me permite acceder a msg o contenido en este caso res.body.msg y no marca error .text si marca error

//         expect(res.status).not.toBe(404) //esto indica que el estado de res no debe ser 404
//         expect(res.body.msg).not.toBe('desde api') //esto indica que el estado de res no debe ser 404

//     })
// })

jest.mock("../config/db") //se pone la ruta de la base de datos porque se debe pasar un string y con esto creamos el mock
describe('connectDB', () => {
    test('should handle database connection error / Debería gestionar el error de conexión a la base de datos.', async () => {

        jest.spyOn(db, 'authenticate')
            .mockRejectedValue(new Error('No se pudo conectar a la base de datos'))//toma dos parametros uno el objeto y el otro es la funcion, el authenticate es el mismo que esta en connectDB(). Este spyON crea una funcion en el ambiente del mock de manera simulada, le pasamos la base de datos y el metodo que queremos observar su comportamiento
        //este mock lanza una excepcion para que cuando se conecte a la base de datos simule un error y caiga en el catch y probar el catch

        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('No se pudo conectar a la base de datos') //lo que esperamos
        )  //especial cuando trabajamos con mock
    })
})

afterAll(async () => {
    await db.close(); //cerramos la conexion a la base de datos despues de todas las pruebas


})