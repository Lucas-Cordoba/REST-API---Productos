import request from "supertest";
import server from "../../server";

//Pruebas de integracion
describe('POST /api/products', () => {

    test('should display validation errors / debería mostrar errores de validación', async () => {


        const response = await request(server).post('/api/products').send({/*SIMULO QUE ENVIO UN FORMULARIO VACIO */ }) //.send es lo que le vamos a enviar osea que info quiero pasar al endpoint 


        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        // expect(response.body.errors).toHaveLength(/*Extension del arreglo */) testea la extension del arreglo

        expect(response.status).not.toBe(404)
    })

    test('should validate that the price is a number and greater than 0 / debe validar que el precio es un numero y que sea mayor que 0', async () => {


        const response = await request(server).post('/api/products').send({

            name: 'Monitor Curvo',
            price: 0
        }) //.send es lo que le vamos a enviar osea que info quiero pasar al endpoint 


        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        expect(response.status).not.toBe(404)
    })

    test('should validate that the price is greater than 0 / debe validar que el precio sea mayor que 0', async () => {


        const response = await request(server).post('/api/products').send({

            name: 'Monitor Curvo',
            price: 'Hola'
        }) //.send es lo que le vamos a enviar osea que info quiero pasar al endpoint 


        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        expect(response.status).not.toBe(404)
    })



    test('should create a new product / debería crear un nuevo producto', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Teclado - Testing",
            price: 50  //esto es lo que enviamos para probar
        }) //.send es lo que le vamos a enviar osea que info quiero pasar al endpoint 


        // console.log(response.body); // 👈 Revisa qué imprime en la consola al correr npm test
        expect(response.status).toBe(201) //toBe se puede reemplazar por toEqual que es lo mismo
        expect(response.body).toHaveProperty('data') //se fija que tenga la propiedad de data, el json devuelve todo los atributos dentro de un objeto data

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')

    })
})

describe('GET /api/products', () => {


    test('should check if api/products url exists / debe checkear que exista la url de api/products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).not.toBe(404) //se comprueba que no devuelva un error 404 que significa pagina no encontrada
    })

    test('GET a JSON response with products / Obtén una respuesta JSON con productos', async () => {
        const response = await request(server).get('/api/products')


        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => {

    test('Should return a 404 response for a non-existent product / Debería devolver una respuesta 404 para un producto inexistente.', async () => {

        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)


        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto No Encontrado')
    })

    test('should check valid ID in the URL / se debería verificar que el ID en la URL sea válido', async () => {

        const response = await request(server).get('/api/products/not-valid-url')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Id del producto no válido')

    })

    test('get a JSON response for a single product / obtener una respuesta JSON para un único producto', async () => {

        const response = await request(server).get('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

    })
})


describe('PUT /api/products/:id', () => {

    test('should check valid ID in the URL / se debería verificar que el ID en la URL sea válido', async () => {

        const response = await request(server)
            .put('/api/products/not-valid-url')
            .send({
                name: "Monitor Actualizado",
                price: 300,
                availability: true
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Id del producto no válido')

    })

    test('Should display validation error messages when updating a product / Debería mostrar mensajes de error de validación al actualizar un producto', async () => {

        const response = await request(server).put('/api/products/1').send({}) //le ponemos 1 porque el 1 siempre va a existir

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy() //expresion que si bien no es true ni false pero detecta que tiene algo lo trata como true tambien esta toBeFalsy
        expect(response.body.errors).toHaveLength(5) //porque en este caso tiene 5 errores

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('Should validate that the price is greater than 0/ Debería validar que el precio sea mayor a 0', async () => {

        const response = await request(server)
            .put('/api/products/1')
            .send({
                name: "Monitor Actualizado",
                price: -300,
                availability: true
            }) //le ponemos 1 porque el 1 siempre va a existir

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy() //expresion que si bien no es true ni false pero detecta que tiene algo lo trata como true tambien esta toBeFalsy
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El precio del producto debe ser un número positivo')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })


    test('Should a return 404 response for a non-existent product/ Debería devolver una respuesta 404 para un producto inexistente', async () => {

        const productId = 2000
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Monitor Actualizado",
                price: 300,
                availability: true
            })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('Should a return 404 response for a non-existent product/ Debería devolver una respuesta 404 para un producto inexistente', async () => {

        const productId = 2000
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Monitor Actualizado",
                price: 300,
                availability: true
            })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('Should update an existing product with valid data/Debería actualizar un producto existente con datos válidos', async () => {

        const response = await request(server)
            .put('/api/products/1')
            .send({
                name: "Monitor Actualizado",
                price: 300,
                availability: true
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })


})

describe('PATCH /api/products/:id', () => {

    test('should return a 404 response for a non-existing products / Debería devolver una respuesta 404 para un producto inexistente', async () => {

        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    test('should update the product availability / debería actualizar la disponibilidad del producto', async () => {

        const response = await request(server).patch('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(true)
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')


    })
})  

describe('DELETE /api/products/:id', () => {
    test('should check valid ID / se debería verificar que el ID es valido', async () => {

        const response = await request(server)
            .delete('/api/products/not-valid')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('Id del producto no válido')

    })

    test('should return a 404 response for a non-existent product / debería devolver una respuesta 404 para un producto inexistente', async () => {

        const productId = 2000
        const response = await request(server)
            .delete(`/api/products/${productId}`)


        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')
        expect(response.status).not.toBe(200)

    })

    test('should delete a product / deberia borrar el producto', async () => {

        const response = await request(server)
            .delete(`/api/products/1`) //se envia 1 porque siempre existe

        
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto eliminado')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)

    } )

})