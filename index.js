const express = require("express");
const pedidoRoutes = require('./routes/pedidoRoutes'); 
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas
app.use("/pedidos", pedidoRoutes);
app.use("/empleados", empleadoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});