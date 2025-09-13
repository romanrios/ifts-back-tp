const express = require("express");

const { 
    getPedidos, 
    getPedidoById,
    addPedido, 
    updatePedido, 
    patchPedido, 
    deletePedido
} = require("../controllers/empladosController");


const router = express.Router();

// Rutas
router.get("/", getPedidos);            // GET    /pedidos
router.get("/:id", getPedidoById);        // Devuelve un pedido específico por id
router.post("/agregar", addPedido);       // POST   /pedidos/agregar
router.put("/:id", updatePedido);         // PUT    /pedidos/:id
router.patch("/:id", patchPedido);        // PATCH  /pedidos/:id
router.delete("/:id", deletePedido);      // DELETE /pedidos/:id

module.exports = router;

