const express = require("express");
const pedidoRoutes = require('./routes/temarioRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas
app.use("/pedido", pedidoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});