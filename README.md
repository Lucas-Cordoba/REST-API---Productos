Resta API (Represntational State Transfer)

conjunto de reglas que permite que las aplicaciones se comuniquen entre sí a traves de la web.
Pueden ser diseñadas en cualquier lenguaje que se ejecute por HTTP

Una Rest API debe responder a los Request HTTP: GET, POST, PUT, PATCH y DELETE

Tiene una forma ordenada y estructurada de poner a disposicion los recursos de una base de datos.


HTTP que son
Debe responder a los Request HTTP: GET, POST, PUT, PATCH y DELETE
Nos sirve para realizar ciertas acciones de esta forma existe una orden, una estructura.

En la de clima enviabamos una peticion tipo:
GET a determinada URL y nos servia para obtener los datos del clima, GET es para obtenter datos

GET Obtenter datos
POST Es para enviar datos o para la creacion
PUT / PATCH Para actualizar
DELETE Eliminar

Tiene ciertos endpoint y cierta estructura 

Endpoints
Son URLS para hacer operaciones CRUD

Ejemplos
Listar todos los clientes GET /clientes
Obtener un solo cliente GET /clientes/10
Crear un nuevo cliente POST /clientes
Editar un cliente PUT /clientes/3
Borrar cliente DELETE /cliente/8
/10, /3 y /8 es el id, son iguales las url nada mas que diferente la sintaxis de la request

Ventajas

Simples de crear
Forma escalable y ordenada de crear un proyecto

Facilidad de uso y se pueden consumir en REACT, Angular, Vue.js, Flutter, Kotlin, Swift, etc

Herramientas para crearlas

Cualquier lenguaje de programacion que se ejecute en el servidor puede servir para crear una REST API: Python, PHP, Java, C#, etc
Hay muchos Frameworks que soportan la creacion y simplifican mucho el proceso entre ellos Laravel, Express, Rails o Django.

Requiere una base de datos como MySQL, PostgreSQL o MongoDB.

PERN (Un STACK)
Iniciales de PostgreSQL, Express, React, Node.js
Es un stack, un conjunto de herramientas para crear una app.
Cuando se inicia un proyecto se va a decir vamos a utilizar este framework de CSS, esta libreria o framework de JavaScript, esta basde de datos.

Full Stack quiere decir que puedes crear el Stack Completo de una App y PERN te permite hacerlo


React en el Front End y Node en el backend son una combinacion muy comun pero React lo podemos usar con Backends de Django, Rails o Laravel.

PostgreSQL
tambien llamado Postgres es un sistema de gestion de bases de datos relacional orientado a objetos y de codigo abierto como MySQL pero es una alternativa totalmente gratis y de codigo abierto.
Para interactuar con nuestra base de datos podemos hacerlo por medio de un ORM
Un ORM tiene todos los metodos para crear, obtener, actualizar y eliminar datos de nuestra base de datos

Express 
Infraestructura web rápida, minimalista y flexible para Node.js
A diferencia de Rails o Laravel no tiene un sistema de vistas definido, tampoco ORM o Autenticacion, sino que te deja mucha parte de la configuracion en tus manos
Ideal para utilizarse en APP Web Monoliticas o como API

Node.Js
Entorno de ejecucion en JavaScript que se ejecuta en el servidor 
Entre sus ventajas se encuentra la gran cantidad de librerias disponibles para integrarlas en proyectos con NPM, todos los paquetes que estan en npm pueden ser utilizados en node.js
Es capaz de consultar Base de datos, autenticar usuarios, manejar rutas y mucho mas

Ventajas de MERN o PERN 
Separacion de backend y Frontend, permite tener un orden o permite que unos trabajen en el Front y otros en el Back.
Al separar a los dos va a ser mas sencillo identificar donde esta el error
Comunicacion entre Backend y frontend con JSON y peticiones HTTP
NPM con gran cantidad de dependencias para cada cosa
Solo se utiliza codigo de JavaScript/TypeScript para crear aplicaciones Full Stack





Cuando creamos un servidor Express puedes crearlo como JS y solamente lo subimos a algun servidor que soporte Node.Js 
Pero sin embargo vamos a escribir el codigo en TypeScript y no podemos subir unicamente el codigo en TypeScript porque no lo soporta ningun servidor.
Siempre TypeScript hay que compilarlo a JavaScript

Esto lo vamos a hacer con Handlers porque es un proyecto pequeño

Pero si el proyecto es muy grande podemos usar Model View Controller o Arquitectura limpia o capas o cualquiera de estas arquitecturas que hay
Siempre hay que elegir un arquitectura adecuada para cada proyecto
Elegir arquitectura en base al equipo de trabajo, tecnologias que todos conozcan


"type": "module", //esto es para indicar que el proyecto va a estar desarrollado con modulo
esto tambien marca error cuadno queremos importar una funcion por eso debemos decirle a node js o agregarle un interprete para que identifique el codigo de TypeScript

hay que agregar dependencias de desarrollo npm i -D typescript ts-node(version node de typecript) en versiones nuevas es npm install -D tsx

en vez de nodemon utilizamos 

tsx --watch src/index.ts

npx tsc src/index.ts con esto lo que hace es tomar el codigo de TypeScript y convertirlo a una version de JS

npx tsc con el archivo tsconfig.json va a encontrar todo donde compilar, que compilar etc

ORM en node.js

Simplifica la comunicacion entre una base de datos y el codigo de nuestra aplicacion

En lugar de escribir consultas SQL, escribimos funciones que son bastantes similares a el codigo que ya escribimos, al final es codigo TypeScript o JavaScript

Ventajas

Abstraccion, interactuar con la base de datos usando objetos, clases y metodos en lugar de escribir consultas SQL complicadas

Portabilidad, interactúas con la base de datos usando objetos y métodos en TypeScript/JavaScript en lugar de consultas SQL nativas. Si pasas, por ejemplo, de PostgreSQL a MySQL o SQLite, en general solo necesitas cambiar la configuración de la conexión (el driver y las credenciales) y el ORM se encarga de traducir tus consultas al nuevo motor

Productividad, El ORM se encarga de tareas repetitivas como la generacion de consultas SQL, lo que te permite enfocarte en la logica de tu app

Consideracion al elegir ORM

- Debe estar en desarrollo de forma activa (Debe haber versiones nuevas todo el tiempo)
- Un ORNM se encarga de limpiar la info, Asegura la entrada de la informacion pero siempre debes validar antes de tocar la base de datos, validar en el servidor te da mejor performance y evitas conexiones y consultas innecesarias a la base de datos
- Cambiar de ORM's puede no ser tan simple, elige con cuidado antes de iniciar un proyecto, cada orm implementa metodos que pueden ser similares pero no funcionan igual

opcioones de ORM para NODE, los mas utilizados

    MONGOOSE: solo soporta mongoDB
    PRISMA
    SEQUELIZE: soporta oracle, postgresql, mysql, mariadb, sqlite y sqlserver
    TYPEORM

En este proyecto usamos Sequelize
Soporta TypeScript y diferentes bases de datos
Soporta relaciones de informacion, lazy loading, eager loading y mas

opciones que soportan crear base de datos

-Elephantsql que te permite crear bases de datos postgresql
-Filess.io permite MySQL, MariaDB, PostgreSQL y MongoDB
-Render la que usamos en este proyecto. Es gratis, te permite tener bases de datos, proyecto con un backend y tambien sitios estaticos, incluso proyectos con docker 

En render hay que exportar y a los 90 dias crear otra base de datos e importarla

para instalar las dependencias de sequelize hay que instalar la dependencia y el CLI de Sequelize o sus dialectos / drivers de base de datos

Utilizamos una dependencia llamada dotenv para las variables de entorno

colors usamos esta dependencia para resaltar palabras en nuestra terminal

nuestros modelos siempre estan sincronizados con nuestra base de datos, ahi definimos los atributos que son los mismo de la base de datos

sequelize-typescript es para obtener soporte de typescript en sequelize.
Esta buena porque usa decoradores que es una sintaxis que inician con @ en diferentes lenguajes y mandan a llamar a una funcion y no modifica el codigo sino que las manda a llamar

express-validators es para validaciones de datos