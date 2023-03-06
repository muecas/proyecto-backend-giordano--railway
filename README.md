# API Ecommerce
## Inicialización APP

Para inicializar la aplicación utilice el siguiente comando:

`ts-node app.ts`

Por defecto la aplicación inicializa utilizando MongoDB como motor de base de datos. Para especificar las opciones de conexión se utilizan las variables de entorno `DB_URI` y `DB_NAME`, para especificar la uri del servidor y el nombre de la base de datos, de la siguiente manera:

`DB_URI=mongodb://localhost:27017 DB_NAME=ecommerce ts-node app.ts`

### Otras opciones de inicialización

Especificando `DB_ENGINE` se puede especificar el motor de base de datos de preferencia. Las opciones disponibles son:

- `mongo`
- `firebase`
- `mysql`
- `sqlite3`

Para inicializar la aplicación con un motor de base de datos específico (ej. Firebase):

`DB_ENGINE=firebase ts-node app.ts`

Para el caso de MySQL pueden especificarse las siguientes variables de entorno:

- `DB_HOST` - para especificar el host, por defecto es `localhost`
- `DB_PORT` - para especificar el puerto, por defecto es `3306`
- `DB_USER` - para especificar el usuario, por defecto es `root`
- `DB_PASSWORD` - para especificar la contraseña, por defecto es `muecas78`
- `DB_NAME` - para especificar el nombre de la base de datos, por defecto es `coderhouse`

Para inicializar la aplicación utilizando como motor de base de datos MySQL:

`DB_ENGINE=mysql DB_HOST=localhost DB_PORT=puerto DB_NAME=nombrebasededatos DB_USER=usuario DB_PASSWORD=pass ts-node app.ts`

### Otras configuraciones

Se podrán configurar los siguientes parámetros mediante las variables de entorno descritas a continuaciǿn:

- `PORT` para poder especificar el puerto de escucha del servidor. Valor por defecto: `8080`
- `LOG_LEVEL` para el nivel de logueo; los posibles valores son: `info`, `warn`, `error`. Valor por defecto: `info`
- `GZIP` para utilizar la compresión gzip para las respuestas; los posibles valores son `0` y `1`. Valor por defecto: `0`
- `MODE` para poder inicializar el servidor en modo fork o cluster; los posibles valores son `fork` y `cluster`. Valor por defecto: `fork`
- `CPUS` para poder especificar la cantidad de cpus a utilizar (únicamente con `MODE=cluster`). Valor por defecto a la cantidad máxima de procesadores de sistema
- `SESSION_TYPE` - tipo de sesión a utilizar; podrá ser del tipo `MONGO_STORE` o `FILE_STORE`
- `SESSION_SECRET_KEY` - contraseña para encriptar la sesión
- `SESSION_TTL` - TTL de sesión
- `SESSION_COOKIE_MAXAGE` - duración de la cookie de sesión
- `SMTP_SERVICE` - tipo de servicio de email, podrá ser del tipo `gmail` o `custom` (o cualquier otro valor hará que tome el tipo `custom`)
- `SMTP_HOST` - host; sólo cuando `SMTP_HOST=custom`
- `SMTP_PORT` - puerto; sólo cuando `SMTP_HOST=custom`
- `SMTP_SECURE` - conexión segura, podrá ser del tipo `yes` o `no`; sólo cuando `SMTP_HOST=custom`
- `SMTP_USER` - usuario SMTP
- `SMTP_PASSWORD` - contraseña SMTP
- `EMAIL_FROM` - cuenta desde la cual se envían las notificaciones vía email
- `EMAIL_TO` - cuenta desde la cual se reciben las notificaciones vía email
- `JWT_SECRET` - clave secreta de encripación de tokens

Además los siguientes parámetros podrán también especificarse por línea de comandos:

- `port` o `p` para definit el valor de `PORT`
- `mode` o `m` para definir el valor de `MODE`
- `cpus` o `c` para definir el valor de `CPUS`
- `gzip` o `g` para definir el valor de `GZIP`

Los valores se tomarán en el siguiente orden de prioridad: cli > ENV > valores por defecto.

## Creación de tablas y colecciones

Para crear las tablas y colecciones necesarias para la aplicación utilizamos el script provisto (`create-tables.ts`). Para ejecutar este script definimos el motor de base de datos a utilizar (no es necesario para el caso de Firebase):

`DB_ENGINE=firebase ts-node create-tables.ts`

Las opciones disponibles para `DB_ENGINE` so las mismas que para el caso de inicialización de la aplicación.

## Vistas públicas

Están disponibles las siguientes vistas públicas:

- `/info` - Desplegando información del sistema y proceso
- `/chat` - Mensajería (chat) a través de socket
- `/login` - Acceso a login
- `/user-token` - Acceso a ver el token de usuario
- `/signup` - Acceso a registro de usuario
- `/logout` - Acceso a cerrar sesión de usuario

## Endpoints

**Endpoints autorización:**

- `POST: /api/auth` - Autoriza el usuario y obtiene un token de aplicación; espera un `json` en el cuerpo de la petición: `{ email: string, password: string }`. El token generado podrá ser utilizado para los endpoints marcados con * –a modo ilustrativo para los endpoints de productos ya que no hay roles definidos, por lo que un usuario registrado puede también editar información de productos.

**Endpoints productos:**

- `GET: /api/products` - Toma todos los productos
- `GET: /api/products/:id` - Toma un producto por ID
- `POST: /api/products` - Agrega productos; espera un `json` en el cuerpo de la petición: `{ name: string, price: number, thumbnail: PathLike }` *
- `PUT: /api/products/:id` - Actualiza un producto por ID; espera un `json` en el cuerpo de la petición: `{ name: string, price: number, thumbnail: PathLike }` *
- `DELETE: /api/products/:id` - Elimina un producto por ID *

**Endpoints carros:**

- `POST: /api/carts` - Crea un nuevo carro
- `GET: /api/carts/:id` - Toma un carro por ID
- `DELETE: /api/carts/:id` - Elimina un carro por ID
- `GET: /api/carts/:id/products` - Toma los productos de un carro por ID
- `POST: /api/carts/:id/products` - Agrega productos a un carro por ID; espera un `json` en el cuerpo de la petición: `{ products: [{ id: string, amount: number }, ...] }`
- `DELETE: /api/carts/:id/products/:productId` - Elimina un producto del carro por ID de carro y producto

**Endpoints órdenes:**

- `POST: /api/orders/:id` - Crea una nueva orden a partir de un carro (`:id` corresponde al ID de carro) *
- `GET: /api/orders/:id` - Toma una orden por ID *
- `GET: /api/ordeers` - Toma todas las órdenes para el usuario logueado (id de usuario propiedario del `token` enviado) *

Los endpoints marcados con * están únicamente disponibles para usuarios autenticados que hayan obtenido un `token`. Para obtener un `token` el usuario se podrá [registrar](http://localhost:PORT/signup), [loguear](http://localhost:PORT/login) u obtener el `token` mediante el endpoint de autorización de usuarios (previo registro).