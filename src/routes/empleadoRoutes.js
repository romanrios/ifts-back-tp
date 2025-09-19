const express = require("express");
const router = express.Router();
const {
    getEmpleados,
    getEmpleadoAgregar,
    getEmpleadoEditar,
    getEmpleadoBorrar,
    getEmpleadoById,
    addEmpleado,
    updateEmpleado,
    patchEmpleado,
    deleteEmpleado
} = require("../controllers/empleadosController");

router.get("/", getEmpleados);
router.get("/agregar", getEmpleadoAgregar);
router.get("/:id/editar", getEmpleadoEditar);
router.get("/:id/borrar", getEmpleadoBorrar);
router.get("/:id", getEmpleadoById);
router.post("/agregar", addEmpleado);
router.put("/:id", updateEmpleado);
router.patch("/:id", patchEmpleado);
router.delete("/:id", deleteEmpleado);

module.exports = router;


