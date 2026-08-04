//en el middleware debo tener el request y el response, y el next es para que continue con la siguiente funcion que se ejecute despues de este middleware
import { Request, Response, NextFunction } from "express";
import {validationResult} from "express-validator";
export const handleInputErrors = (req : Request, res : Response, next : NextFunction) => {
    
    
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) //si hay errores le enviamos al cliente un status 400 
    }

    next() //es como un termine aqui sigue con la siguiente funcion, con esto le decimos a express que continue con la siguiente funcion que se ejecute despues de este middleware
}