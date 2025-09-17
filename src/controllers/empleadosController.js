const { getAll, add, update, patch, remove } = require("../models/EmpleadosModel");

function getEmpleados(req, res) {
    const empleados = getAll();
    res.render("empleados/index", { empleados: empleados });
}

function getEmpleadoById(req, res) {
    const { id } = req.params;
    const empleados = getAll();
    const empleado = empleados.find(e => e.id === parseInt(id));

    if (!empleado) {
        return res.status(404).render("error", { mensaje: "Empleado no encontrado" });
    }
    res.json(empleado);
}

function addEmpleado(req, res) {
    const { id, rol, area } = req.body;
    const nuevoEmpleado = add(id, rol, area);
    res.json({ mensaje: "Empleado agregado", empleado: nuevoEmpleado });
}

function updateEmpleado(req, res) {
    const { id } = req.params;
    const { rol, area } = req.body;
    const actualizado = update(id, rol, area);

    if (!actualizado) {
        return res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
    res.json({ mensaje: "Empleado actualizado", empleado: actualizado });
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
        return res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
    res.json({ mensaje: "Empleado eliminado", empleado: eliminado });
}

module.exports = { getEmpleados, getEmpleadoById, addEmpleado, updateEmpleado, patchEmpleado, deleteEmpleado };
