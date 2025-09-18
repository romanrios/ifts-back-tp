const express = require("express");
const router = express.Router();
const {
    getPedidos,
    getPedidoById,
    addPedido,
    updatePedido,
    patchPedido,
    deletePedido,
    getPedidoAgregar
} = require("../controllers/pedidosController");

router.get("/", getPedidos);
router.get("/agregar", getPedidoAgregar);
router.get("/:id", getPedidoById);
router.post("/agregar", addPedido);
router.put("/:id", updatePedido);
router.patch("/:id", patchPedido);
router.delete("/:id", deletePedido);

module.exports = router;