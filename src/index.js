// Imports
import express from "express";
import methodOverride from 'method-override';
import path from "path";
import { fileURLToPath } from 'url';
import indexRoutes from './routes/indexRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js';
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv"; 

// Configuración dotenv
dotenv.config();

// Obtiene el nombre del archivo actual y su directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicialización de la app
const app = express();
const PORT = process.env.PORT || 3000;  // Ahora usamos dotenv

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

