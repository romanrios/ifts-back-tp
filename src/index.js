const express = require("express");
const methodOverride = require('method-override');
const path = require("path");
const indexRoutes = require('./routes/indexRoutes.js');
const pedidoRoutes = require('./routes/pedidoRoutes.js');
const empleadoRoutes = require('./routes/empleadoRoutes.js');
const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

// Rutas
app.use("/", indexRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/empleados", empleadoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
