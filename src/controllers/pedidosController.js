import model from "../models/PedidosModel.js";
import empleadosModel from "../models/EmpleadosModel.js";
import clientesModel from "../models/ClientesModel.js";

// IDs de pedidos de muestra (bloqueados)
const SAMPLE_PEDIDO_IDS = [
    "68d964a1e32ff7a7ffa5f8fa",
    "68d964bde32ff7a7ffa5f905",
    "68d9651ac0ee128f815e9081",
    "68d974a3ea326e08fdb56afe"
];

async function getPedidos(req, res) {
    try {
        const pedidos = await model.getAll();
        res.render("pedidos/index", { pedidos: pedidos });
    } catch (error) {
        console.error('Error en getPedidos:', error);
        res.status(500).render("error", { mensaje: "Error al obtener pedidos" });
    }
}

async function getPedidoAgregar(req, res) {
    try {
        const empleados = await empleadosModel.getAll();
        const clientes = await clientesModel.getAll();
        res.render("pedidos/agregar", { empleados, clientes });
    } catch (error) {
        console.error('Error en getPedidoAgregar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener empleados" });
    }
}

async function getPedidoEditar(req, res) {
    try {
        const { id } = req.params;
        const pedido = await model.getById(id);
        if (!pedido) {
            return res.status(404).render("error", { mensaje: "Pedido no encontrado" });
        }
        const empleados = await empleadosModel.getAll();
        const clientes = await clientesModel.getAll();
        res.render("pedidos/editar", { pedido, empleados, clientes });
    } catch (error) {
        console.error('Error en getPedidoEditar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener pedido" });
    }
}


async function getPedidoBorrar(req, res) {
    try {
        const { id } = req.params;
        const pedido = await model.getById(id);
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
        const pedido = await model.getById(id);

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
        await model.add({ cliente, descripcion, precio, plataforma, idEmpleado });
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

        // Evitar edición de pedidos de muestra
        if (SAMPLE_PEDIDO_IDS.includes(id)) {
            return res.status(403).render("error", { mensaje: "Este pedido es de muestra y no se puede modificar." });
        }

        const { cliente, descripcion, precio, plataforma, idEmpleado } = req.body;
        const actualizado = await model.update(id, { cliente, descripcion, precio, plataforma, idEmpleado });

        if (!actualizado) {
            return res.status(404).render("error", { mensaje: "Pedido no encontrado" });
        }

        res.redirect("/pedidos");
    } catch (error) {
        console.error('Error en updatePedido:', error);
        res.status(500).render("error", { mensaje: "Error al actualizar pedido" });
    }
}


async function deletePedido(req, res) {
    try {
        const { id } = req.params;

        // Evitar borrado de pedidos de muestra
        if (SAMPLE_PEDIDO_IDS.includes(id)) {
            return res.status(403).render("error", { mensaje: "Este pedido es de muestra y no se puede modificar." });
        }

        const eliminado = await model.remove(id);

        if (!eliminado) {
            return res.status(404).render("error", { mensaje: "Pedido no encontrado" });
        }
        res.redirect("/pedidos");
    } catch (error) {
        console.error('Error en deletePedido:', error);
        res.status(500).render("error", { mensaje: "Error al eliminar pedido" });
    }
}

export default { getPedidos, getPedidoAgregar, getPedidoEditar, getPedidoBorrar, getPedidoById, addPedido, updatePedido, deletePedido };
