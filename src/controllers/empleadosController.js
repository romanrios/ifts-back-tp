import { getAll, getById, add, update, patch, remove } from "../models/EmpleadosModel.js";

async function getEmpleados(req, res) {
    try {
        const empleados = await getAll();
        res.render("empleados/index", { empleados: empleados });
    } catch (error) {
        console.error('Error en getEmpleados:', error);
        res.status(500).render("error", { mensaje: "Error al obtener empleados" });
    }
}

function getEmpleadoAgregar(req, res) {
    res.render('empleados/agregar')
}

async function getEmpleadoEditar(req, res) {
    try {
        const { id } = req.params;
        const empleado = await getById(id);
        if (!empleado) {
            return res.status(404).render("error", { mensaje: "Empleado no encontrado" });
        }
        res.render("empleados/editar", { empleado });
    } catch (error) {
        console.error('Error en getEmpleadoEditar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener empleado" });
    }
}

async function getEmpleadoBorrar(req, res) {
    try {
        const { id } = req.params;
        const empleado = await getById(id);
        if (!empleado) {
            return res.status(404).render('error', { mensaje: 'Empleado no encontrado' });
        }
        res.render('empleados/borrar', { empleado });
    } catch (error) {
        console.error('Error en getEmpleadoBorrar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener empleado" });
    }
}

async function getEmpleadoById(req, res) {
    try {
        const { id } = req.params;
        const empleado = await getById(id);
        if (!empleado) {
            return res.status(404).render("error", { mensaje: "Empleado no encontrado" });
        }
        res.render("empleados/detalle", { empleado: empleado });
    } catch (error) {
        console.error('Error en getEmpleadoById:', error);
        res.status(500).render("error", { mensaje: "Error al obtener empleado" });
    }
}

async function addEmpleado(req, res) {
    try {
        const { rol, area } = req.body;
        await add(rol, area);
        res.redirect("/empleados");
    } catch (error) {
        console.error('Error en addEmpleado:', error);
        res.status(500).render("error", { mensaje: "Error al agregar empleado" });
    }
}

async function updateEmpleado(req, res) {
    try {
        const { id } = req.params;
        const { rol, area } = req.body;
        const actualizado = await update(id, rol, area);

        if (!actualizado) {
            return res.status(404).render("error", { mensaje: "Empleado no encontrado" });
        }

        // Devuelve JSON si la petición lo solicita, si no redirige
        if (req.xhr || (req.headers.accept?.includes('json'))) {
            return res.json({ mensaje: "Empleado actualizado", empleado: actualizado });
        }

        return res.redirect("/empleados");
    } catch (error) {
        console.error('Error en updateEmpleado:', error);
        res.status(500).render("error", { mensaje: "Error al actualizar empleado" });
    }
}

async function patchEmpleado(req, res) {
    try {
        const { id } = req.params;
        const actualizado = await patch(id, req.body);
        if (!actualizado) {
            return res.status(404).json({ mensaje: "Empleado no encontrado" });
        }
        res.json({ mensaje: "Empleado modificado parcialmente", empleado: actualizado });
    } catch (error) {
        console.error('Error en patchEmpleado:', error);
        res.status(500).json({ mensaje: "Error al actualizar empleado" });
    }
}

async function deleteEmpleado(req, res) {
    try {
        const { id } = req.params;
        const eliminado = await remove(id);
        if (!eliminado) {
            return res.status(404).render("error", { mensaje: "Empleado no encontrado" });
        }
        res.redirect("/empleados");
    } catch (error) {
        console.error('Error en deleteEmpleado:', error);
        res.status(500).render("error", { mensaje: "Error al eliminar empleado" });
    }
}

export default { getEmpleados, getEmpleadoAgregar, getEmpleadoBorrar, getEmpleadoEditar, getEmpleadoById, addEmpleado, updateEmpleado, patchEmpleado, deleteEmpleado };
