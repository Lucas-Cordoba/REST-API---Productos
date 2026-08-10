import { Router } from 'express' //importamos el router de express para poder manejar las rutas de nuestra aplicacion
import { createProduct, getProducts, getProductById, updateProduct, updateAvalability, deleteProduct } from './handlers/product'
import { body, param } from "express-validator";  //body se usa para validar los campos en el router que no es asincrona y 
import { handleInputErrors } from './middleware';




const router = Router() //de esta manera podemos crear un router para manejar las rutas de nuestra aplicacion
/** ACA SE DEFINE UN ESQUEMA y cada vez que defino cada uno de los endpoints lo voy comunicando
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 90 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
*/

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                           schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Product'
 */



router.get('/', getProducts) //aqui estamos usando la funcion getProducts que creamos en handlers/product.ts para manejar la peticion GET 

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Return a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.get('/:id',
    param("id").isInt().withMessage("Id del producto no válido"),
    handleInputErrors,
    getProductById) //lo que habilita el :id es que podemos pasarle un parametro a la ruta, en este caso el id del producto, se envia a traves de la url



/**
 * @swagger
 * /api/products/:
 *   post:
 *     summary: Creates a new product
 *     tags:
 *       - Products
 *     description: Returns a new record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor Curvo 90 Pulgadas"
 *               price:
 *                 type: number
 *                 example: 300
 *     responses:
 *       201:
 *         description: successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - invalid input data
 */



router.post('/',
    //VALIDACION EN EL ROUTER
    body("name").notEmpty().withMessage("El nombre del producto no puede ir vacio"),//con esto validamos que el nombre del producto no este vacio, y si lo esta le enviamos un mensaje de error al cliente
    body("price")
        .isNumeric().withMessage("El precio del producto debe ser un número")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
        .custom(value => value > 0).withMessage("El precio del producto debe ser un número positivo"),

    handleInputErrors, //Este handleInputErrors se encarga de manejar los errores, si pasa esta funcion intermedia, entonces se ejecuta la funcion createProduct
    createProduct) //aqui estamos usando la funcion createProduct que creamos en handlers/product.ts para manejar la peticion POST



/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Updates a product with user input
 *     tags:
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor Curvo 90 Pulgadas"
 *               price:
 *                 type: number
 *                 example: 300
 *               availability:
 *                   type: boolean
 *                   example: true
 *     responses:
 *       200:
 *         description: successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - invalid ID o invalid input data
 *       404:
 *         description: Product Not Found
 */


router.put('/:id',
    //VALIDACION EN EL ROUTER
    param("id").isInt().withMessage("Id del producto no válido"),
    body("name").notEmpty().withMessage("El nombre del producto no puede ir vacio"),//con esto validamos que el nombre del producto no este vacio, y si lo esta le enviamos un mensaje de error al cliente
    body("price")
        .isNumeric().withMessage("El precio del producto debe ser un número")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
        .custom(value => value > 0).withMessage("El precio del producto debe ser un número positivo"),
    body('availability')
        .isBoolean().withMessage("El campo de disponibilidad no es válido"),
    handleInputErrors,
    updateProduct) //PUT hace modificaciones completas de un recurso, es decir, si el cliente envia un objeto con todos los campos del producto, entonces se actualiza el producto completo, si el cliente envia un objeto con algunos campos del producto, entonces se actualiza solo esos campos. Se usa para actualizar un recurso completo


/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update Product availability
 *     tags:
 *       - Products
 *     description: Returns the updated availability
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - invalid ID
 *       404:
 *         description: Product Not Found
 */

router.patch('/:id',
    param("id").isInt().withMessage("Id del producto no válido"),
    handleInputErrors,
    updateAvalability)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deletes a product by a given ID
 *     tags:
 *       - Products
 *     description: Returns a confirmation message
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               value: 'Producto Eliminado'
 *       400:
 *         description: Bad Request - invalid ID
 *       404:
 *         description: Product Not Found
 */


router.delete('/:id',
    param("id").isInt().withMessage("Id del producto no válido"),
    handleInputErrors,
    deleteProduct)
//con router accedemos a todas las rutas que queramos crear y con los metodos get, post, put, patch y delete podemos manejar las peticiones que nos lleguen de nuestro cliente

export default router //exportamos el router para poder usarlo en nuestro server.ts