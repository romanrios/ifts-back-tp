import express from "express";
import ctrl from "../controllers/ClientesController.js";

const router = express.Router();

// LISTADO Y CREACIÓN
router.get("/", ctrl.getClientes);
router.get("/agregar", ctrl.getClienteAgregar);
router.post("/agregar", ctrl.addCliente); // Procesa el formulario POST

// DETALLE, EDICIÓN Y BORRADO (Usando el parámetro :id)
router.get("/:id", ctrl.getClienteById);
router.get("/:id/editar", ctrl.getClienteEditar);
router.get("/:id/borrar", ctrl.getClienteBorrar);
router.put("/:id", ctrl.updateCliente); // Procesa la actualización PUT
router.delete("/:id", ctrl.deleteCliente); // Procesa el borrado DELETE

export default router;
