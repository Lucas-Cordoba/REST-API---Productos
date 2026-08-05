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


import request from "supertest"; //Nos permite hacer peticiones a un determinado endpoint, es decir, nos permite hacer pruebas a nuestro servidor
import server from "../server"; //importamos nuestro servidor para poder hacer pruebas a nuestro servidor
import db from "../config/db";

describe ('GET /api', () => {
    test('debería devolver una respuesta JSON / should send back a json response', async () => {
        const res = await request(server).get('/api') //hacemos una peticion get a nuestro servidor
        
        expect(res.status).toBe(200) //esperamos que el status de la respuesta sea 200, es decir, que la peticion haya sido exitosa
        expect(res.headers['content-type']).toMatch(/json/)  //Sirve para confirmar que la API o endpoint está respondiendo adecuadamente en formato JSON
        expect(res.body.msg).toBe('Desde API') //se fija que lo que hay en msg sea  Desde API
        //Esto es para acceder al contenido
        // console.log(res.text)
        // console.log(res.body.msg) //este me permite acceder a msg o contenido en este caso res.body.msg y no marca error .text si marca error
    
        expect(res.status).not.toBe(404) //esto indica que el estado de res no debe ser 404
        expect(res.body.msg).not.toBe('desde api') //esto indica que el estado de res no debe ser 404
    
    } )
})


afterAll(async () => {
    await db.close(); //cerramos la conexion a la base de datos despues de todas las pruebas

    
})