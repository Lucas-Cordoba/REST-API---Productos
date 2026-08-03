import server from "./server";
import colors from "colors";
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => { //este listen lo que hace es levantar el servidor en el puerto 4000 y ejecutar la funcion que le pasamos como segundo parametro
    console.log(colors.cyan.bold(`Servidor corriendo en el puerto ${PORT}`))
})