const express = require("express");
const pedidoRoutes = require('./routes/pedidoRoutes'); 
const empleadoRoutes = require('./routes/empleadoRoutes.js');
const path = require("path");
const app = express();
const PORT = 3000;

// Configurar motor de plantillas
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

// Rutas
app.get("/", (req, res) => {
    res.render("index");
});
app.use("/pedidos", pedidoRoutes);
app.use("/empleados", empleadoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});