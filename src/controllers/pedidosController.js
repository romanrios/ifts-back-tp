import model from "../models/PedidosModel.js";
import empleadosModel from "../models/EmpleadosModel.js";
import plataformasModel from "../models/PlataformasModel.js";
import clientesModel from "../models/ClientesModel.js";
import productosModel from "../models/ProductosModel.js";

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
        const plataformas = await plataformasModel.getAll();
        const productos = await productosModel.getAll();
        res.render("pedidos/agregar", { empleados, clientes, plataformas, productos });
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
        const plataformas = await plataformasModel.getAll();
        const productos = await productosModel.getAll();
        res.render("pedidos/editar", { pedido, empleados, clientes, plataformas, productos });
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
        const { cliente, producto, precio, plataforma, idEmpleado } = req.body;
        await model.add({ cliente, producto, precio, plataforma, idEmpleado });
        res.redirect("/pedidos");
    } catch (error) {
        console.error('Error en addPedido:', error);
        res.status(500).render("error", { mensaje: "Error al agregar pedido" });
    }
}

async function updatePedido(req, res) {
    try {
        const { id } = req.params;

        if (SAMPLE_PEDIDO_IDS.includes(id)) {
            return res.status(403).render("error", { mensaje: "Este pedido es de muestra y no se puede modificar." });
        }

        const { cliente, producto, precio, plataforma, idEmpleado } = req.body;
        const actualizado = await model.update(id, { cliente, producto, precio, plataforma, idEmpleado });

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
