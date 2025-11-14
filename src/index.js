import express from "express";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import initializePassport from "./config/passportConfig.js";
import connectDB from "./config/db.js";

import indexRoutes from "./routes/indexRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";
import empleadoRoutes from "./routes/empleadoRoutes.js";
import plataformaRoutes from "./routes/plataformaRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";

import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(session({
  secret: process.env.SESSION_SECRET || "claveSecreta",
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.user = req.user;
  next();
});

const openPaths = [
  "/auth/login",
  "/auth/register",
  "/auth/logout",
  "/favicon.ico"
];

app.use((req, res, next) => {
  if (req.path.startsWith("/public")) return next();

  if (openPaths.includes(req.path)) return next();

  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }

  next();
});

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/empleados", empleadoRoutes);
app.use("/plataformas", plataformaRoutes);
app.use("/clientes", clienteRoutes);
app.use("/productos", productoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
