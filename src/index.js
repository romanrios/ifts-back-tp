// Imports
const express = require("express");
const methodOverride = require('method-override');
const path = require("path");
const indexRoutes = require('./routes/indexRoutes.js');
const pedidoRoutes = require('./routes/pedidoRoutes.js');
const empleadoRoutes = require('./routes/empleadoRoutes.js');
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler.js");

// Inicialización de la app
const app = express();
const PORT = 3000;

// Configuración PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middlewares globales
app.use(express.urlencoded({ extended: true }));    // Procesa formularios
app.use(express.json());                            // Procesa JSON
app.use(express.static(path.join(__dirname, "public")));    // Archivos estáticos
app.use(methodOverride('_method'));                 // Permite PUT/DELETE desde formularios

// Rutas principales
app.use("/", indexRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/empleados", empleadoRoutes);

// Middlewares de manejo de errores
app.use(notFoundHandler);   // 404 ruta no encontrada
app.use(errorHandler);      // errores generales

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

