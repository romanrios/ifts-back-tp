import model from "../models/ClientesModel.js";

const SAMPLE_CLIENT_IDS = [
    "68f6b3d0f4ae604d2e8fd822",
    "68f6c3eff4ae604d2e8fd83c",
    "68f6c406f4ae604d2e8fd83f",
    "68f6c434f4ae604d2e8fd842"
];

async function getClientes(req, res) {
    try {
        const clientes = await model.getAll();
        res.render("clientes/index", { clientes: clientes });
    } catch (error) {
        console.error('Error en getClientes:', error);
        res.status(500).render("error", { mensaje: "Error al obtener clientes" });
    }
}

function getClienteAgregar(req, res) {
    res.render('clientes/agregar')
}

async function getClienteEditar(req, res) {
    try {
        const { id } = req.params;
        const cliente = await model.getById(id);
        if (!cliente) {
            return res.status(404).render("error", { mensaje: "Cliente no encontrado" });
        }
        res.render("clientes/editar", { cliente });
    } catch (error) {
        console.error('Error en getClienteEditar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener cliente" });
    }
}

async function getClienteBorrar(req, res) {
    try {
        const { id } = req.params;
        const cliente = await model.getById(id);
        if (!cliente) {
            return res.status(404).render('error', { mensaje: 'Cliente no encontrado' });
        }
        res.render('clientes/borrar', { cliente });
    } catch (error) {
        console.error('Error en getClienteBorrar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener cliente" });
    }
}

async function getClienteById(req, res) {
    try {
        const { id } = req.params;
        const cliente = await model.getById(id);
        if (!cliente) {
            return res.status(404).render("error", { mensaje: "Cliente no encontrado" });
        }
        res.render("clientes/detalle", { cliente: cliente });
    } catch (error) {
        console.error('Error en getClienteById:', error);
        res.status(500).render("error", { mensaje: "Error al obtener cliente" });
    }
}

async function addCliente(req, res) {
    try {
        const { nombre, telefono } = req.body;
        await model.add(nombre, telefono);
        res.redirect("/clientes");
    } catch (error) {
        console.error('Error en addCliente:', error);
        res.status(500).render("error", { mensaje: "Error al agregar cliente" });
    }
}

async function updateCliente(req, res) {
    try {
        const { id } = req.params;
        const { nombre, telefono } = req.body;

        if (SAMPLE_CLIENT_IDS.includes(id)) {
            return res.status(403).render("error", { mensaje: "Este cliente es de muestra y no se puede modificar." });
        }

        const actualizado = await model.update(id, nombre, telefono);

        if (!actualizado) {
            return res.status(404).render("error", { mensaje: "Cliente no encontrado" });
        }

        if (req.xhr || (req.headers.accept?.includes('json'))) {
            return res.json({ mensaje: "Cliente actualizado", cliente: actualizado });
        }

        return res.redirect("/clientes");
    } catch (error) {
        console.error('Error en updateCliente:', error);
        res.status(500).render("error", { mensaje: "Error al actualizar cliente" });
    }
}


async function deleteCliente(req, res) {
    try {
        const { id } = req.params;

        if (SAMPLE_CLIENT_IDS.includes(id)) {
            return res.status(403).render("error", { mensaje: "Este cliente es de muestra y no se puede modificar." });
        }

        const eliminado = await model.remove(id);

        if (!eliminado) {
            return res.status(404).render("error", { mensaje: "Cliente no encontrado" });
        }

        res.redirect("/clientes");
    } catch (error) {
        console.error('Error en deleteCliente:', error);
        res.status(500).render("error", { mensaje: "Error al eliminar cliente" });
    }
}


export default { getClientes, getClienteAgregar, getClienteBorrar, getClienteEditar, getClienteById, addCliente, updateCliente, deleteCliente };
