import express from "express";
import {
    getEmpleados,
    getEmpleadoAgregar,
    getEmpleadoEditar,
    getEmpleadoBorrar,
    getEmpleadoById,
    addEmpleado,
    updateEmpleado,
    patchEmpleado,
    deleteEmpleado
} from "../controllers/empleadosController.js";

const router = express.Router();

router.get("/", getEmpleados);
router.get("/agregar", getEmpleadoAgregar);
router.get("/:id/editar", getEmpleadoEditar);
router.get("/:id/borrar", getEmpleadoBorrar);
router.get("/:id", getEmpleadoById);
router.post("/agregar", addEmpleado);
router.put("/:id", updateEmpleado);
router.patch("/:id", patchEmpleado);
router.delete("/:id", deleteEmpleado);

export default router;


