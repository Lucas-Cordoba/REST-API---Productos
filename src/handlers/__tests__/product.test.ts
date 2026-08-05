import  request  from "supertest";
import server from "../../server";


describe('POST /api/products', () =>{

    test('should display validation errors / debería mostrar errores de validación', async () => {


        const response = await request(server).post('/api/products').send({/*SIMULO QUE ENVIO UN FORMULARIO VACIO */}) //.send es lo que le vamos a enviar osea que info quiero pasar al endpoint 
    
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors') 
        // expect(response.body.errors).toHaveLength(/*Extension del arreglo */) testea la extension del arreglo
        
        expect(response.status).not.toBe(404)
    })
    
    
    
    
    test('should create a new product / debería crear un nuevo producto', async () =>{
        const response = await request(server).post('/api/products').send({
            name : "Teclado - Testing",
            price: 50  //esto es lo que enviamos para probar
        }) //.send es lo que le vamos a enviar osea que info quiero pasar al endpoint 
    
        expect(response.status).toBe(201) //toBe se puede reemplazar por toEqual que es lo mismo
        expect(response.body).toHaveProperty('data') //se fija que tenga la propiedad de data, el json devuelve todo los atributos dentro de un objeto data
    
        expect(response.status).not.toBe(400) 
        expect(response.status).not.toBe(404) 
        expect(response.body).not.toHaveProperty('errors') 
    
    })
})