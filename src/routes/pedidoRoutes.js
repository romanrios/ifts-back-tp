const express = require("express");
const router = express.Router();
const {
    getPedidos,
    getPedidoAgregar,
    getPedidoBorrar,
    getPedidoById,
    addPedido,
    updatePedido,
    patchPedido,
    deletePedido,
} = require("../controllers/pedidosController");

router.get("/", getPedidos);
router.get("/agregar", getPedidoAgregar);
router.get("/:id/borrar", getPedidoBorrar);
router.get("/:id", getPedidoById);
router.post("/agregar", addPedido);
router.put("/:id", updatePedido);
router.patch("/:id", patchPedido);
router.delete("/:id", deletePedido);

module.exports = router;