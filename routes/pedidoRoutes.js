const express = require("express");

const { 
    getPedidos, 
    getTemaById,
    addTema, 
    updateTema, 
    patchTema, 
    deleteTema 
} = require("../controllers/pedidosController");


const router = express.Router();

// Rutas
router.get("/", getPedidos);            // GET    /pedidos
router.get("/:id", getPedidoById);        // Devuelve un tema específico por id
router.post("/agregar", addTema);       // POST   /temario/agregar
router.put("/:id", updateTema);         // PUT    /temario/:id
router.patch("/:id", patchTema);        // PATCH  /temario/:id
router.delete("/:id", deleteTema);      // DELETE /temario/:id

module.exports = router;

/*
Endpoints: es el punto de acceso completo a una API, que combina:

1 - La URL base del servidor
2 - La ruta
3 - El método HTTP (GET, POST, PUT, DELETE, etc.)

GET http://localhost:3000/  = es un endpoint.
POST http://localhost:3000/agregar = es otro endpoint.
*/
