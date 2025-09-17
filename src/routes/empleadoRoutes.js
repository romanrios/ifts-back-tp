const express = require("express");

const {
    getEmpleados,
    getEmpleadoById,
    addEmpleado,
    updateEmpleado,
    patchEmpleado,
    deleteEmpleado
} = require("../controllers/empleadosController");

const router = express.Router();

// Rutas
router.get("/", getEmpleados);
router.get("/agregar", (req, res) => {res.render('empleados/agregar')});
router.get("/:id", getEmpleadoById);
router.post("/agregar", addEmpleado);
router.put("/:id", updateEmpleado);
router.patch("/:id", patchEmpleado);
router.delete("/:id", deleteEmpleado);

module.exports = router;


