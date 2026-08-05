import { Router } from 'express' //importamos el router de express para poder manejar las rutas de nuestra aplicacion
import { createProduct, getProducts, getProductById, updateProduct, updateAvalability, deleteProduct } from './handlers/product'
import { body, param } from "express-validator";  //body se usa para validar los campos en el router que no es asincrona y 
import { handleInputErrors } from './middleware';




const router = Router() //de esta manera podemos crear un router para manejar las rutas de nuestra aplicacion




router.get('/', getProducts) //aqui estamos usando la funcion getProducts que creamos en handlers/product.ts para manejar la peticion GET 
router.get('/:id',
    param("id").isInt().withMessage("Id del producto no válido"),
    handleInputErrors,
    getProductById) //lo que habilita el :id es que podemos pasarle un parametro a la ruta, en este caso el id del producto, se envia a traves de la url



router.post('/',
    //VALIDACION EN EL ROUTER
    body("name").notEmpty().withMessage("El nombre del producto no puede ir vacio"),//con esto validamos que el nombre del producto no este vacio, y si lo esta le enviamos un mensaje de error al cliente
    body("price")
        .isNumeric().withMessage("El precio del producto debe ser un número")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
        .custom(value => value > 0).withMessage("El precio del producto debe ser un número positivo"),

    handleInputErrors, //Este handleInputErrors se encarga de manejar los errores, si pasa esta funcion intermedia, entonces se ejecuta la funcion createProduct
    createProduct) //aqui estamos usando la funcion createProduct que creamos en handlers/product.ts para manejar la peticion POST





router.put('/:id',
    //VALIDACION EN EL ROUTER
    param("id").isInt().withMessage("Id del producto no válido"),
    body("name").notEmpty().withMessage("El nombre del producto no puede ir vacio"),//con esto validamos que el nombre del producto no este vacio, y si lo esta le enviamos un mensaje de error al cliente
    body("price")
        .isNumeric().withMessage("El precio del producto debe ser un número")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
        .custom(value => value > 0).withMessage("El precio del producto debe ser un número positivo"),
    body('availabilty')
        .isBoolean().withMessage("El campo de disponibilidad no es válido"),
    handleInputErrors,
    updateProduct) //PUT hace modificaciones completas de un recurso, es decir, si el cliente envia un objeto con todos los campos del producto, entonces se actualiza el producto completo, si el cliente envia un objeto con algunos campos del producto, entonces se actualiza solo esos campos. Se usa para actualizar un recurso completo


router.patch('/:id', 
    param("id").isInt().withMessage("Id del producto no válido"),
    handleInputErrors,
    updateAvalability)

router.delete('/:id', 
    param("id").isInt().withMessage("Id del producto no válido"),
    handleInputErrors, 
    deleteProduct)
//con router accedemos a todas las rutas que queramos crear y con los metodos get, post, put, patch y delete podemos manejar las peticiones que nos lleguen de nuestro cliente

export default router //exportamos el router para poder usarlo en nuestro server.ts