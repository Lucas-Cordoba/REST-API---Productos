//nos ayuda a separar la funcionalidad de nuestra aplicacion en diferentes archivos
import { Request, Response } from "express"; //importamos los tipos de express para poder usarlos en nuestra aplicacion
// import {check, validationResult} from "express-validator";  check se usa en funciones asincronas y validationResult se usa para obtener los errores de validacion que se generen en la funcion asincrona
import Product from "../models/Product.model";


export const getProducts = async (req: Request, res : Response) => { 
    try {
        const products = await Product.findAll({
            order: [
                ['id', 'DESC'] //ordenamos los productos por id de manera descendente
            ],
            attributes:{exclude: ['createdAt', 'updatedAt']} //excluimos los campos de fecha de creación y actualización
            //esto excluye esos atributos de la respuesta que le enviamos al cliente
            // limit: 10 //limitamos la cantidad de productos que vamos a obtener de la base de datos a 1
        }) //con esto obtenemos todos los productos de la base de datos
        res.json({ data: products })
    } catch (error) {
        console.log(error)
    }
}


export const getProductById = async (req: Request, res : Response) => { 
    try {
        // console.log(req.params.id) //con esto podemos ver en la consola el id que nos envia el cliente en la url de la peticion
       
       
        const { id } = req.params //con esto obtenemos el id que nos envia el cliente
        
        const product = await Product.findByPk(+id) //con esto obtenemos el producto de la base de datos que tiene el id que nos envia el cliente
        //se pone un + porque el id que se envia desde la url es un string
        
        if(!product){
            return res.status(404).json({ error: "Producto No Encontrado" })
        }

        
        res.json({ data: product })

    } catch (error) {
        console.log(error)
    }
}


export const createProduct = async (req: Request, res: Response) => {

    // console.log(req.body) //con esto podemos ver en la consola lo que nos envia el cliente en el body de la peticion


    // const product = new Product(req.body) //con esto creamos un nuevo producto con los datos que nos envia el cliente. Se puede hacer asi o asi

    //el id aparece null porque no lo estamos enviando desde el cliente se genera cuando se almacena
    // const product = await Product.save() //con esto guardamos el producto en la base de datos

    //VALIDACION en el handlers
    // await check("name").notEmpty().withMessage("El nombre del producto no puede ir vacio").run(req) //con esto validamos que el nombre del producto no este vacio, y si lo esta le enviamos un mensaje de error al cliente
    // await check("price")
    //         .isNumeric().withMessage("El precio del producto debe ser un número")
    //         .notEmpty().withMessage("El precio del producto no puede ir vacio")
    //         .custom(value => value > 0).withMessage("El precio del producto debe ser un número positivo")
    //         .run(req) //con esto validamos que el precio del producto no este vacio

    // let errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors: errors.array()}) //si hay errores le enviamos al cliente un status 400 
    // }

    try {
        const product = await Product.create(req.body)
        res.status(201).json({ data: product }) //con esto le enviamos al cliente el estado y el json que enviamos, 201 codigo OK de creado
    } catch (error) {
        console.error(error)
    }
    //Va a dar un error en caso de que puede haber una conexion erronea a la base de datos, o que el cliente nos envie un body vacio, o que el cliente nos envie un body con un precio negativo, o que el cliente nos envie un body con un precio que no sea un numero, o que el cliente nos envie un body con un nombre vacio, o que el cliente nos envie un body con un nombre que ya exista en la base de datos, etc.


}

//debe ser asincrona porque vamos a hacer una peticion a la base de datos, y eso puede tardar un tiempo


export const updateProduct = async (req: Request, res: Response) => { 
    const { id } = req.params
        
    const product = await Product.findByPk(+id) 
        
    if(!product){
        return res.status(404).json({ error: "Producto No Encontrado" })
    }
    //Con todo este codigo estamos validando que el producto exista en la base de datos antes de actualizarlo, si no existe le enviamos un error al cliente


    
    // console.log(req.body) //con esto podemos ver en la consola lo que nos envia el cliente
    


    //Actualizar
    await product.update(req.body) //Hace modificaciones parciales,con esto actualizamos el producto con los datos que nos envia el cliente, y si no le enviamos algun dato, entonces se mantiene el dato que ya tenia el producto 
    await product.save()
    
    res.json({ data: product })
}

export const updateAvalability = async (req: Request, res: Response) => { 
    const { id } = req.params
    const product = await Product.findByPk(+id) 
        
    if(!product){
        return res.status(404).json({ error: "Producto No Encontrado" })
    }
    //Con todo este codigo estamos validando que el producto exista en la base de datos antes de actualizarlo, si no existe le enviamos un error al cliente


    
    // console.log(req.body) //con esto podemos ver en la consola lo que nos envia el cliente
    

    //Actualizar
    await product.update(req.body) //Hace modificaciones parciales,con esto actualizamos el producto con los datos que nos envia el cliente, y si no le enviamos algun dato, entonces se mantiene el dato que ya tenia el producto 
    await product.save()
    
    console.log(product.dataValues) //con dataValues podemos leer los datos del producto que acabamos de actualizar
    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(+id) 
        
    if(!product){
        return res.status(404).json({ error: "Producto No Encontrado" })
    }

    //Eliminar
    await product.destroy() //con esto eliminamos el producto de la base de datos
    //Lo que hacen mucho es poner una columna mas en la base de datos con 1/0 si tiene true esat 1 y si tiene 0 no es visible y lo que hacemos es cambiarle el estado, porque en algunos proyectos esta prohibido eliminar  
    
    
    await product.save() //con esto guardamos los cambios en la base de datos
    res.json({ data: `Producto ${product.dataValues.name} eliminado` }) 
}