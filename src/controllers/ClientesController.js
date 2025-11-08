import model from "../models/ClientesModel.js";

// Función auxiliar para manejar errores de Mongoose/servidor y renderizar la vista de error
const renderError = (res, error, mensaje) => {
    console.error(`Error en ${mensaje}:`, error);
    res.status(500).render("error", { mensaje: `Error al ${mensaje}. ${error.message || ''}` });
};

// Obtener todos los clientes (Listar)
async function getClientes(req, res) {
    try {
        const clientes = await model.getAll();
        // Asumiendo que la vista se llama views/clientes/index.pug
        res.render("clientes/index", { clientes }); 
    } catch (error) {
        renderError(res, error, "obtener clientes");
    }
}

// Mostrar formulario para agregar cliente
function getClienteAgregar(req, res) {
    // Asumiendo que la vista se llama views/clientes/agregar.pug
    res.render('clientes/agregar'); 
}

// Agregar nuevo cliente (POST)
async function addCliente(req, res) {
    try {
        const { nombre, telefono, email, direccion } = req.body;
        // La función add en el modelo maneja la validación de Mongoose
        await model.add({ nombre, telefono, email, direccion }); 
        res.redirect("/clientes");
    } catch (error) {
        // En caso de error de validación (ej. teléfono o email duplicado), devolvemos 400
        res.status(400).render("error", { mensaje: "Error al agregar cliente. Verifique los campos únicos (Teléfono/Email)." });
    }
}

// Obtener cliente por ID (Detalle)
async function getClienteById(req, res) {
    try {
        const { id } = req.params;
        const cliente = await model.getById(id);
        if (!cliente) {
            return res.status(404).render("error", { mensaje: "Cliente no encontrado" });
        }
        // Asumiendo que la vista se llama views/clientes/detalle.pug
        res.render("clientes/detalle", { cliente });
    } catch (error) {
        renderError(res, error, "obtener detalle del cliente");
    }
}

// Mostrar formulario para editar cliente
async function getClienteEditar(req, res) {
    try {
        const { id } = req.params;
        const cliente = await model.getById(id);
        if (!cliente) {
            return res.status(404).render("error", { mensaje: "Cliente no encontrado" });
        }
        // Asumiendo que la vista se llama views/clientes/editar.pug
        res.render("clientes/editar", { cliente });
    } catch (error) {
        renderError(res, error, "obtener datos para edición");
    }
}

// Actualizar cliente (PUT)
async function updateCliente(req, res) {
    try {
        const { id } = req.params;
        const { nombre, telefono, email, direccion } = req.body;
        
        const actualizado = await model.update(id, { nombre, telefono, email, direccion });

        if (!actualizado) {
            return res.status(404).render("error", { mensaje: "Cliente no encontrado para actualizar" });
        }

        res.redirect("/clientes");
    } catch (error) {
        res.status(400).render("error", { mensaje: "Error al actualizar cliente. Verifique los campos." });
    }
}

// Mostrar vista para borrar
async function getClienteBorrar(req, res) {
    try {
        const { id } = req.params;
        const cliente = await model.getById(id);
        if (!cliente) {
            return res.status(404).render('error', { mensaje: 'Cliente no encontrado para borrar' });
        }
        // Asumiendo que la vista se llama views/clientes/borrar.pug
        res.render('clientes/borrar', { cliente });
    } catch (error) {
        renderError(res, error, "obtener datos para borrado");
    }
}

// Eliminar cliente (DELETE)
async function deleteCliente(req, res) {
    try {
        const { id } = req.params;
        const eliminado = await model.remove(id);

        if (!eliminado) {
            return res.status(404).render("error", { mensaje: "Cliente no encontrado" });
        }
        res.redirect("/clientes");
    } catch (error) {
        renderError(res, error, "eliminar cliente");
    }
}

export default { 
    getClientes, 
    getClienteAgregar, 
    addCliente, 
    getClienteById, 
    getClienteEditar,
    updateCliente,
    getClienteBorrar,
    deleteCliente
};