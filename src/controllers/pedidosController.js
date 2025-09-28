import { getAll, getById, add, update, patch, remove } from "../models/PedidosModel.js";
import { getAll as getEmpleados } from "../models/EmpleadosModel.js";

async function getPedidos(req, res) {
    try {
        const pedidos = await getAll();
        res.render("pedidos/index", { pedidos: pedidos });
    } catch (error) {
        console.error('Error en getPedidos:', error);
        res.status(500).render("error", { mensaje: "Error al obtener pedidos" });
    }
}

async function getPedidoAgregar(req, res) {
    try {
        const empleados = await getEmpleados();
        res.render("pedidos/agregar", { empleados });
    } catch (error) {
        console.error('Error en getPedidoAgregar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener empleados" });
    }
}

async function getPedidoEditar(req, res) {
    try {
        const { id } = req.params;
        const pedido = await getById(id);
        if (!pedido) {
            return res.status(404).render("error", { mensaje: "Pedido no encontrado" });
        }
        res.render("pedidos/editar", { pedido });
    } catch (error) {
        console.error('Error en getPedidoEditar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener pedido" });
    }
}

async function getPedidoBorrar(req, res) {
    try {
        const { id } = req.params;
        const pedido = await getById(id);
        if (!pedido) {
            return res.status(404).render('error', { mensaje: 'Pedido no encontrado' });
        }
        res.render('pedidos/borrar', { pedido });
    } catch (error) {
        console.error('Error en getPedidoBorrar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener pedido" });
    }
}

async function getPedidoById(req, res) {
    try {
        const { id } = req.params;
        const pedido = await getById(id);

        if (!pedido) {
            return res.status(404).render("error", { mensaje: "Pedido no encontrado" });
        }
        res.render("pedidos/detalle", { pedido: pedido });
    } catch (error) {
        console.error('Error en getPedidoById:', error);
        res.status(500).render("error", { mensaje: "Error al obtener pedido" });
    }
}

async function addPedido(req, res) {
    try {
        const { cliente, descripcion, precio, plataforma, idEmpleado } = req.body;
        await add({ cliente, descripcion, precio, plataforma, idEmpleado });
        res.redirect("/pedidos");
    } catch (error) {
        console.error('Error en addPedido:', error);
        res.status(500).render("error", { mensaje: "Error al agregar pedido" });
    }
}

// PUT - reemplazar el pedido completo
async function updatePedido(req, res) {
    try {
        const { id } = req.params;
        const { cliente, descripcion, precio, plataforma, idEmpleado } = req.body;
        const actualizado = await update(id, { cliente, descripcion, precio, plataforma, idEmpleado });

        if (!actualizado) {
            return res.status(404).render("error", { mensaje: "Pedido no encontrado" });
        }
        res.redirect("/pedidos");
    } catch (error) {
        console.error('Error en updatePedido:', error);
        res.status(500).render("error", { mensaje: "Error al actualizar pedido" });
    }
}

async function patchPedido(req, res) {
    try {
        const { id } = req.params;
        const actualizado = await patch(id, req.body);

        if (!actualizado) {
            return res.status(404).json({ mensaje: "Pedido no encontrado" });
        }
        res.json({ mensaje: "Pedido modificado parcialmente", pedido: actualizado });
    } catch (error) {
        console.error('Error en patchPedido:', error);
        res.status(500).json({ mensaje: "Error al actualizar pedido" });
    }
}

async function deletePedido(req, res) {
    try {
        const { id } = req.params;
        const eliminado = await remove(id);

        if (!eliminado) {
            return res.status(404).render("error", { mensaje: "Pedido no encontrado" });
        }
        res.redirect("/pedidos");
    } catch (error) {
        console.error('Error en deletePedido:', error);
        res.status(500).render("error", { mensaje: "Error al eliminar pedido" });
    }
}

export default { getPedidos, getPedidoAgregar, getPedidoEditar, getPedidoBorrar, getPedidoById, addPedido, updatePedido, patchPedido, deletePedido };
