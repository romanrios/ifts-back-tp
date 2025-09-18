const { getAll, add, update, patch, remove } = require("../models/PedidosModel");
const { getAll: getEmpleados } = require("../models/EmpleadosModel");

function getPedidos(req, res) {
    const pedidos = getAll();
    res.render("pedidos/index", { pedidos: pedidos });
}

function getPedidoAgregar(req, res) {
    const empleados = getEmpleados();
    res.render("pedidos/agregar", { empleados });
}

function getPedidoEditar(req, res) {
    const { id } = req.params;
    const pedidos = getAll();
    const pedido = pedidos.find(p => p.id === parseInt(id));
    if (!pedido) return res.status(404).render("error", { mensaje: "Pedido no encontrado" });
    res.render("pedidos/editar", { pedido });
}

function getPedidoBorrar(req, res) {
    const { id } = req.params;
    const pedido = getAll().find(p => p.id === parseInt(id));
    if (!pedido) return res.status(404).render('error', { mensaje: 'Pedido no encontrado' });
    res.render('pedidos/borrar', { pedido });
}

function getPedidoById(req, res) {
    const { id } = req.params;
    const pedidos = getAll();
    const pedido = pedidos.find(t => t.id === parseInt(id));

    if (!pedido) {
        return res.status(404).render("error", { mensaje: "Pedido no encontrado" });
    }
    res.render("pedidos/detalle", { pedido: pedido });
}

function addPedido(req, res) {
    const { cliente, descripcion, precio, plataforma, idEmpleado } = req.body;
    try {
        const nuevoPedido = add({ cliente, descripcion, precio, plataforma, idEmpleado });
        res.redirect("/pedidos");
    } catch (error) {
        res.status(500).render("error", { mensaje: "Error al agregar pedido" });
    }
}

// PUT - reemplazar el pedido completo
function updatePedido(req, res) {
    const { id } = req.params;
    const { cliente, descripcion, precio, plataforma, idEmpleado } = req.body;
    const actualizado = update(id, { cliente, descripcion, precio, plataforma, idEmpleado });

    if (!actualizado) {
        return res.status(404).render("error", { mensaje: "Pedido no encontrado" });
    }
    res.redirect("/pedidos");
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
        return res.status(404).render("error", { mensaje: "Pedido no encontrado" });
    }
    res.redirect("/pedidos");
}

module.exports = { getPedidos, getPedidoAgregar, getPedidoEditar, getPedidoBorrar, getPedidoById, addPedido, updatePedido, patchPedido, deletePedido };
