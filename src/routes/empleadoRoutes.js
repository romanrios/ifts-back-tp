import express from "express";
import ctrl from "../controllers/empleadosController.js"

const router = express.Router();

router.get("/", ctrl.getEmpleados);
router.get("/agregar", ctrl.getEmpleadoAgregar);
router.get("/:id/editar", ctrl.getEmpleadoEditar);
router.get("/:id/borrar", ctrl.getEmpleadoBorrar);
router.get("/:id", ctrl.getEmpleadoById);
router.post("/agregar", ctrl.addEmpleado);
router.put("/:id", ctrl.updateEmpleado);
router.patch("/:id", ctrl.patchEmpleado);
router.delete("/:id", ctrl.deleteEmpleado);

export default router;


