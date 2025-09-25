import express from "express";
import {
    getPedidos,
    getPedidoAgregar,
    getPedidoEditar,
    getPedidoBorrar,
    getPedidoById,
    addPedido,
    updatePedido,
    patchPedido,
    deletePedido,
} from "../controllers/pedidosController.js";

const router = express.Router();

router.get("/", getPedidos);
router.get("/agregar", getPedidoAgregar);
router.get("/:id/editar", getPedidoEditar);
router.get("/:id/borrar", getPedidoBorrar);
router.get("/:id", getPedidoById);
router.post("/agregar", addPedido);
router.put("/:id", updatePedido);
router.patch("/:id", patchPedido);
router.delete("/:id", deletePedido);

export default router;