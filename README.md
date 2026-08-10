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

Middleware en node

Se refiere a un tipo de software intermedio que se utiliza para procesar las solicitudes HTTP que llegan a una aplicacion web antes de ser manejadas por la funcion de enrutamiento principal, en este caso el router.
En este caso una funcion antes de Create Product y los middleware son funciones que se ejecutan en el medio del fluijo de solicitud y respuesta de una app web y pueden realizar diversas tareas, como autenticacion, validacion de datos, registro de solicitudes, compresion de respuestas entre otras.

En el medio de la ejecucion entre una accion y la otra y forman parte de una solicitud HTTP

Esenciales para la creacion de app web robustas y flexibles. Cada solicitud HTTP pasa a traves de una serie de middlewares antes de llegar a la funcion de controlador que maneja la solicitud final.
Permite modulzarizar y organizar el codigo de manera efectiva, ya que puedes agregar o quitar middlewares segun las necesidades de tu app.


No borrar public en la base de datos
 

 El PUT/PATCH, es para actualizar y es basicamente tomar un producto y actualizarlo

 Cuando trabajamos con PUT tenemos que actualizar todo en este codigo actualizamos con .update(req.body) para no tener ningun error y protegernos, solo actualiza lo que le enviemos.

 PUT reemplaza el elemento con lo que le envies.
 por ejemplo si envio 

 product.availability = req.body.
 availability me reemplaza todo con lo que le madne y osea lo que envio vacio me lo reemplaza por vacio

{
  "name": ,
  "price": ,
  "availability": true
}

 En cambio PATCH reemplaza solo el elemento que le envia el cliente y deja el resto como esta

 en cambio patch si le envio 
 product.availability = req.body.
 availability 

 y devuelve 
 
 {
  "name": "Monitor Actualizado",
  "price": 5000,
  "availability": nuevo valor actualizado
}



PUT Y PATCH cuando utilizar cada uno 

PUT (Actualiza completamente)

Reemplaza o actualiza completamente un recurso existente en un servidor web.
Cuando haces una solicitud PUT, estás diciendo al servidor que tome la información proporcionada y la utilice para reemplazar completamente el recurso en la ubicación especificada.

PATCH (MODIFICA)

Se utiliza para realizar modificaciones parciales en un recurso existente en un servidor web.
En lugar de reemplazar completamente el recurso, como lo hace PUT, PATCH permite realizar cambios específicos en los datos del recurso sin afectar el resto de la información.
   


Se pueden ir haciendo pruebas a los diferentes endpoint con Postman o thunder client pero vamos a hacer pruebas unitarias y de integracion

Testing
Para APIS no es muy diferente que aplicar testing a aplicaciones de React

Siempre debe haber pruebas y en muchos trabajos el codigo debe ir acompañado de Testing.
Mientras mas exhaustivas sean las pruebas mejor es.

Tipos de Testing que se agregan en Node.js y API's

Unit Testing: Verificar que partes individuales en nuestro código funcionen; tales como crear el servidor, visitar una ruta, debemos revisar que cada pieza funcione como esperamos antes de integrarla
con otras.

Integration Testing: Una vez que revisamos que algunas piezas de código funcionen por si solas, es momento de revisar cuando 2 o más se unen, tales como visitar una ruta y obtener datos, o enviar una petición post, validar, y entonces crear el producto.

Jest

Uno de lo frameworks para aplicar testing más conocidos hoy en día, funciona con TypeScript, Node.js, React, Angular y Vue.js
La configuración es muy simple, los test corren aparte y no se mezclan con el código existente.

SuperTest

Jest nos da una serie de funciones para probar el código, pero con l supertest podremos realizar peticiones hacia nuestra API y revisar que el código funcione como esperamos.
Con supertest podremos realizar pruebas te integración entre las
URL's de nuestra API y el ORM.


dependencias son de desarrollo en nuevas versiones

npm i -D supertest @types/supertest
npm i jest @types/jest ts-jest--legacy-peer-deps
npm i -D typescript@5 --save-exact


ts-jest permitir que Jest entienda, transpile y ejecute pruebas unitarias escritas en TypeScript sin necesidad de compilar manualmente todo el proyecto a JavaScript primero.

se usa ts-jest--legacy-peer-deps porque la versión de TypeScript es más nueva que el rango que soporta oficialmente la versión de ts-jest

npx ts-jest config:init es para inicializar un archivo de configruacion de ts-jest

Extensiones para Jest

Jest puede leer archivos de 3 formas:

    -Archivos con la extensión .test.js
    -Archivos con la extensión .spec.js
    -Archivos dentro de la carpeta __tests__


Supertest puede realizar consultas externas hacia nuestros endpoints

ponerle el mimso nombre a los archivos test que los archivos del codigo


Se recomienda tener una base de datos de prueba y una de produccion, la de prueba usamos para aplicar testing y nuevas funcionalidades hasta probar que funcione bien


https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status 
pagina para ver los codigo que vamos a usar ejemplo 200 es OK y 404 No encontrado como por ejemplo una URL mal puesta o que no existe


Code Coverage 

El "code coverage" (cobertura de código) es una métrica utilizada para medir la cantidad de código fuente que ha sido ejecutado o
cubierto por un conjunto de pruebas.
En otras palabras, mide qué porcentaje del código de un programa ha sido probado. Cuanto mayor sea la cobertura de código, más exhaustivas son las pruebas, lo que a menudo se considera un indicador positivo de la calidad del software.

Metricas

Cuales son aceptables, cuales no y cuales son imposibles

-Menos de 60% No es Suficiente vamos a tener que agregar algunas pruebas adicionales para llegar a 60 y 80%
-60% y 80% Se pueden mejorar, se podria ver si se pueden agregar algunas adicionales
- Mas del 80% es suficiente y es un buen numero, y es un buen indicativo de la calidad del software
-Tener el 100% es lo ideal pero poco probable, se deben escribir demasiadas pruebas

No todo hay que probarlo

un MOCK se refiere a una tecnica para las pruebas para simular el comportamiento de ciertos modulo, funciones u objetos en este entorno

Hay que preguntar si para testear las apps tienen code coverage y cual es el porcentaje de metricas

Documentacion de API's

 La documentación de una API es contenido técnico que describe una
API a detalle.
Incluye instrucciones sobre como utilizar una API de forma correcta como son endpoints soportados, tipos de petición, que valores
soporta y mas.
Una vez que una API es publicada, la documentación se asegura que otras herramientas (internas o externas) sepan que se puede hacer y como utilizarla

Porque documentar
La principal es para que sea utilizada de forma correcta
Mayor adopcion, una buena documentacion hara que sea claro que funcionalidad hay disponible y los usuarios podran sacar maximo provecho
Reduce costos de soporte

Uitilizamos swagger

npm i swagger-jsdoc swagger-ui-express

 swagger-jsdoc: Lee las anotaciones/comentarios (formato JSDoc/YAML) que escribes directamente arriba de tus rutas en el código y las convierte en una especificación estándar

 swagger-ui-express: Toma ese objeto/JSON generado y crea automáticamente una interfaz gráfica interactiva (usualmente alojada en /api-docs) donde cualquier desarrollador puede ver los endpoints disponibles

 npm i -D @types/swagger-jsdoc swagger-jsdoc @types/swagger-ui-express swagger-ui-express estas son para tener soporte de TypeScript