# Trabajo Integrador Desarrollo Web Backend

IFTS N° 29 | Año 2025 | Comisión A | Grupo 11

<img width="1211" height="594" alt="07 pedidos" src="https://github.com/user-attachments/assets/8a750a02-70e9-4f39-bd83-f3923acfd7c5" />

## Integrantes

* Córdoba, Daniel Ignacio
* Giménez, Mariela Belén
* Lucchelli, Eugenia
* Ríos, Román

---

## Descripción

Este proyecto corresponde al **Trabajo Integrador de Desarrollo Web Backend** realizado en el Instituto de Formación Técnica Superior N° 29.
Se desarrolló en base al caso seleccionado del restaurante **“Sabor Urbano”**, con el objetivo de construir una aplicación backend en **Express.js** que permita gestionar empleados y pedidos, utilizando **Pug** como motor de plantillas para las vistas.

---

## Tecnologías utilizadas

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/) con [Mongoose](https://mongoosejs.com/)
* [Pug](https://pugjs.org/)
* [Method-Override](https://www.npmjs.com/package/method-override)
* [Bootstrap](https://getbootstrap.com/)
* [Nodemon](https://nodemon.io/) (entorno de desarrollo)
* [dotenv](https://www.npmjs.com/package/dotenv) (variables de entorno)

---

## Estructura del proyecto

src/
│
├── config/
│   └── db.js                 # Conexión a MongoDB con Mongoose
│
├── controllers/              # Controladores de la lógica de negocio
│   ├── clientesController.js
│   ├── empleadosController.js
│   ├── pedidosController.js
│   ├── plataformasController.js
│   └── productosController.js
│
├── data/                     # Archivos de datos en formato JSON
│   ├── empleados.json
│   └── pedidos.json
│
├── middlewares/              # Middlewares personalizados
│   └── errorHandler.js
│
├── models/                   # Modelos de MongoDB con Mongoose
│   ├── ClientesModel.js
│   ├── EmpleadosModel.js
│   ├── PedidosModel.js
│   ├── PlataformasModel.js
│   └── ProductosModel.js
│
├── routes/                   # Definición de rutas
│   ├── clienteRoutes.js
│   ├── empleadoRoutes.js
│   ├── indexRoutes.js
│   ├── pedidoRoutes.js
│   ├── plataformaRoutes.js
│   └── productoRoutes.js
│
├── views/                    # Vistas Pug
│   ├── clientes/
│   ├── empleados/
│   ├── pedidos/
│   ├── plataformas/
│   ├── productos/
│   ├── error.pug
│   ├── index.pug
│   └── layout.pug
│
└── index.js                 # Punto de entrada de la aplicación


---

## Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/romanrios/ifts-back-tp.git
   cd ifts-back-tp
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Configurar variables de entorno:

   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   PORT=3000
   MONGO_URI= (connection string de MongoDB)
   ```

4. Ejecutar la aplicación:

   - Modo desarrollo (Nodemon):
     
     ```bash
     npm run dev
     ```

   - Modo producción:
     
     ```bash
     npm start
     ```

6. Abrir en el navegador:

   ```
   http://localhost:3000
   ```


---


## Funcionalidades principales

* **Gestión de empleados.**
   - Crear, listar, editar y eliminar empleados.  
   - Campos: `_id` (ObjectId), `rol`, `área`
* **Gestión de pedidos.**
   - Crear, listar, editar y eliminar pedidos.  
   - Campos: `_id` (ObjectId), `cliente`, `descripción`, `precio`, `plataforma`, `idEmpleado` (referencia a empleado)
   - Relación: cada pedido se asigna a un empleado existente mediante referencias de MongoDB.
* **Base de datos MongoDB** con esquemas definidos y validaciones.
* * Renderizado de vistas dinámicas con **Pug**.
* Manejo de errores mediante **middlewares personalizados**.
* **Interfaz moderna** con Bootstrap 5.

## Base de datos

### Colección: empleados
```javascript
{
  _id: ObjectId,
  rol: String,
  area: String
}
```

### Colección: pedidos
```javascript
{
  _id: ObjectId,
  cliente: String,
  descripcion: String,
  precio: Number,
  plataforma: String,
  idEmpleado: ObjectId (ref: empleados)
}
```


---

