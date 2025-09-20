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
* [Pug](https://pugjs.org/)
* [Method-Override](https://www.npmjs.com/package/method-override)
* [Bootstrap](https://getbootstrap.com/)
* [Nodemon](https://nodemon.io/) (entorno de desarrollo)

---

## Estructura del proyecto

```
src/
│
├── controllers/         # Controladores de la lógica de negocio
│   ├── empleadosController.js
│   └── pedidosController.js
│
├── data/                # Archivos de datos en formato JSON
│   ├── empleados.json
│   └── pedidos.json
│
├── middlewares/         # Middlewares personalizados
│   └── errorHandler.js
│
├── models/              # Modelos para manejar la información
│   ├── EmpleadosModel.js
│   └── PedidosModel.js
│
├── routes/              # Definición de rutas
│   ├── empleadoRoutes.js
│   ├── indexRoutes.js
│   └── pedidoRoutes.js
│
├── views/               # Vistas Pug
│   ├── empleados/
│   ├── pedidos/
│   ├── error.pug
│   ├── index.pug
│   └── layout.pug
│
└── index.js             # Punto de entrada de la aplicación
```

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

3. Ejecutar la aplicación:

   - Modo desarrollo (Nodemon):
     
     ```bash
     npm run dev
     ```

   - Modo producción:
     
     ```bash
     npm start
     ```


4. Abrir en el navegador:

   ```
   http://localhost:3000
   ```

---


## Funcionalidades principales

* Gestión de empleados.
* Gestión de pedidos.
* Renderizado de vistas dinámicas con **Pug**.
* Manejo de errores mediante **middlewares personalizados**.

---

