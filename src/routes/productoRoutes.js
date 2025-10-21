import express from "express";
import ctrl from "../controllers/productosController.js"

const router = express.Router();

router.get("/", ctrl.getProductos);
router.get("/agregar", ctrl.getProductoAgregar);
router.get("/:id/editar", ctrl.getProductoEditar);
router.get("/:id/borrar", ctrl.getProductoBorrar);
router.get("/:id", ctrl.getProductoById);
router.post("/agregar", ctrl.addProducto);
router.put("/:id", ctrl.updateProducto);
router.delete("/:id", ctrl.deleteProducto);

export default router;


