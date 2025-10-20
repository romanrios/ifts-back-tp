import express from "express";
import ctrl from "../controllers/plataformasController.js"

const router = express.Router();

router.get("/", ctrl.getPlataformas);
router.get("/agregar", ctrl.getPlataformaAgregar);
router.get("/:id/editar", ctrl.getPlataformaEditar);
router.get("/:id/borrar", ctrl.getPlataformaBorrar);
router.get("/:id", ctrl.getPlataformaById);
router.post("/agregar", ctrl.addPlataforma);
router.put("/:id", ctrl.updatePlataforma);
router.delete("/:id", ctrl.deletePlataforma);

export default router;