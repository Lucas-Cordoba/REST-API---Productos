//nos ayuda a separar la funcionalidad de nuestra aplicacion en diferentes archivos
import { Request, Response } from "express"; //importamos los tipos de express para poder usarlos en nuestra aplicacion
// import {check, validationResult} from "express-validator";  check se usa en funciones asincronas y validationResult se usa para obtener los errores de validacion que se generen en la funcion asincrona
import Product from "../models/Product.model";
import {validationResult} from "express-validator";
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

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) //si hay errores le enviamos al cliente un status 400 
    }

    const product = await Product.create(req.body)
    res.json({ data: product }) //con esto le enviamos al cliente el producto que acabamos de crear, para que pueda ver los datos que se guardaron
}

//debe ser asincrona porque vamos a hacer una peticion a la base de datos, y eso puede tardar un tiempo