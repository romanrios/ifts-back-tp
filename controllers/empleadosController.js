const { getAll, add, update, patch, remove } = require("../models/EmpleadosModel");

function getPedidos(req, res) {
    res.json(getAll());
}

function getPedidoById(req, res) {
    const { id } = req.params;
    const pedidos = getAll();
    const pedido = pedidos.find(t => t.id === parseInt(id));

    if (!pedido) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    res.json(pedido);
}

function addPedido(req, res) {
    const { id, descripcion, precio  } = req.body;
    const nuevoPedido = add(id, descripcion, precio);
    res.json({ mensaje: "Pedido agregado", pedido: nuevoPedido });
}

// PUT - reemplazar el pedido completo
function updatePedido(req, res) {
    const { id } = req.params;
    const { descripcion, precio } = req.body;
    const actualizado = update(id, descripcion, precio);

    if (!actualizado) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    res.json({ mensaje: "Pedido actualizado", pedido: actualizado });
}

function patchPedido(req, res) {
    const { id } = req.params;
    const actualizado = patch(id, req.body);

    if (!actualizado) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    res.json({ mensaje: "Pedido modificado parcialmente", pedido: actualizado });
}

function deletePedido(req, res) {
    const { id } = req.params;
    const eliminado = remove(id);

    if (!eliminado) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    res.json({ mensaje: "Pedido eliminado", pedido: eliminado });
}

module.exports = { getPedidos, getPedidoById, addPedido, updatePedido, patchPedido, deletePedido };
