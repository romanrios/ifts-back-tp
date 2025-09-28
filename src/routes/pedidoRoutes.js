import express from "express";
import ctrl from "../controllers/pedidosController.js";

const router = express.Router();

router.get("/", ctrl.getPedidos);
router.get("/agregar", ctrl.getPedidoAgregar);
router.get("/:id/editar", ctrl.getPedidoEditar);
router.get("/:id/borrar", ctrl.getPedidoBorrar);
router.get("/:id", ctrl.getPedidoById);
router.post("/agregar", ctrl.addPedido);
router.put("/:id", ctrl.updatePedido);
router.delete("/:id", ctrl.deletePedido);

export default router;