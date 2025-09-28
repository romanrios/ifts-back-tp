import { getAll, add, update, patch, remove } from "../models/EmpleadosModel.js";

function getEmpleados(req, res) {
    const empleados = getAll();
    res.render("empleados/index", { empleados: empleados });
}

function getEmpleadoAgregar(req, res) {
    res.render('empleados/agregar')
}

function getEmpleadoEditar(req, res) {
    const { id } = req.params;
    const empleados = getAll();
    const empleado = empleados.find(e => e.id === parseInt(id));
    if (!empleado) {
        return res.status(404).render("error", { mensaje: "Empleado no encontrado" });
    }
    res.render("empleados/editar", { empleado });
}

function getEmpleadoBorrar(req, res) {
    const { id } = req.params;
    const empleado = getAll().find(p => p.id === parseInt(id));
    if (!empleado) return res.status(404).render('error', { mensaje: 'Empleado no encontrado' });
    res.render('empleados/borrar', { empleado });
}

function getEmpleadoById(req, res) {
    const { id } = req.params;
    const empleados = getAll();
    const empleado = empleados.find(e => e.id === parseInt(id));
    if (!empleado) {
        return res.status(404).render("error", { mensaje: "Empleado no encontrado" });
    }
    res.render("empleados/detalle", { empleado: empleado });
}

function addEmpleado(req, res) {
    const { rol, area } = req.body;
    try {
        const nuevoEmpleado = add(rol, area);
        res.redirect("/empleados");
    } catch (error) {
        res.status(500).render("error", { mensaje: "Error al agregar empleado" });
    }
}

function updateEmpleado(req, res) {
    const { id } = req.params;
    const { rol, area } = req.body;
    const actualizado = update(id, rol, area);

    if (!actualizado) return res.status(404).render("error", { mensaje: "Empleado no encontrado" });

    // Devuelve JSON si la petición lo solicita, si no redirige
    if (req.xhr || (req.headers.accept?.includes('json'))) {
        return res.json({ mensaje: "Empleado actualizado", empleado: actualizado });
    }

    return res.redirect("/empleados");
}



function patchEmpleado(req, res) {
    const { id } = req.params;
    const actualizado = patch(id, req.body);
    if (!actualizado) {
        return res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
    res.json({ mensaje: "Empleado modificado parcialmente", empleado: actualizado });
}

function deleteEmpleado(req, res) {
    const { id } = req.params;
    const eliminado = remove(id);
    if (!eliminado) {
        res.status(404).render("error", { mensaje: "Empleado no encontrado" });
    }
    res.redirect("/empleados");
}

export default { getEmpleados, getEmpleadoAgregar, getEmpleadoBorrar, getEmpleadoEditar, getEmpleadoById, addEmpleado, updateEmpleado, patchEmpleado, deleteEmpleado };
