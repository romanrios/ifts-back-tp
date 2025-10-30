// Imports
import express from "express";
import methodOverride from 'method-override';
import path from "path";
import { fileURLToPath } from 'url';
import indexRoutes from './routes/indexRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js';
import plataformaRoutes from './routes/plataformaRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import productoRoutes from './routes/productoRoutes.js';
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config(); // Inicializamos dotenv
connectDB();     // Inicializamos la conexión a MongoDB

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
app.use(methodOverride('_method'));                 // Permite PUT/DELETE desde formularios

app.use(express.static(path.join(__dirname, "public")));    // Archivos estáticos
app.get("/logo_sabor_urbano.svg", (req, res) => {   // logo en caché para que no se pida siempre
  res.set("Cache-Control", "public, max-age=86400"); // 1 día
  res.sendFile(__dirname + "/public/logo_sabor_urbano.svg");
});

// Middleware para detectar ruta actual y usarla en las vistas
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

// Rutas principales
app.use("/", indexRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/empleados", empleadoRoutes);
app.use('/plataformas', plataformaRoutes);
app.use("/clientes", clienteRoutes);
app.use("/productos", productoRoutes);

// Middlewares de manejo de errores
app.use(notFoundHandler);   // 404 ruta no encontrada
app.use(errorHandler);      // errores generales

// Inicio del servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

