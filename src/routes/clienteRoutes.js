import express from "express";
import ctrl from "../controllers/clientesController.js"

const router = express.Router();

router.get("/", ctrl.getClientes);
router.get("/agregar", ctrl.getClienteAgregar);
router.get("/:id/editar", ctrl.getClienteEditar);
router.get("/:id/borrar", ctrl.getClienteBorrar);
router.get("/:id", ctrl.getClienteById);
router.post("/agregar", ctrl.addCliente);
router.put("/:id", ctrl.updateCliente);
router.delete("/:id", ctrl.deleteCliente);

export default router;


