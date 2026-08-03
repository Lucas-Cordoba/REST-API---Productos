import { Table, Column, Model, DataType, Default } from "sequelize-typescript"; //No le ponemos Default porque vamos a validar que se llenen todos los campos

@Table({
    tableName: "products",
})

class Product extends Model{
    @Column({
        type: DataType.STRING(100), //maximo 100 caracteres
    })
    name: string;

    @Column({
        type: DataType.FLOAT//(6, 2) //6 caracteres en total, 2 decimales no soporta 
    })
    price: number;

    @Default(true) //por defecto el producto esta disponible
    @Column({
        type: DataType.BOOLEAN //valores true o false
    })
    availability: boolean;
} //Esto es una tabla que va a estar igual en nuestra base de datos, con los mismos campos y tipos de datos, y va a ser la tabla que vamos a usar para guardar los productos que creemos en nuestra aplicacion

//Y con esto ya se crea la tabla en nuestra base de datos

export default Product; 
