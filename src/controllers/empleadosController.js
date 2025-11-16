import model from "../models/EmpleadosModel.js";

const SAMPLE_EMPLOYEE_IDS = [
    "68d94e7b0591cac6ca6042b7",
    "68d94e7b0591cac6ca6042b8",
    "68d94e7b0591cac6ca6042b9",
    "68d97482ea326e08fdb56af5"
];

async function getEmpleados(req, res) {
    try {
        const empleados = await model.getAll();
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
        const empleado = await model.getById(id);
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
        const empleado = await model.getById(id);
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
        const empleado = await model.getById(id);
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
        await model.add(rol, area);
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

        if (SAMPLE_EMPLOYEE_IDS.includes(id)) {
            return res.status(403).render("error", { mensaje: "Este empleado es de muestra y no se puede modificar." });
        }

        const actualizado = await model.update(id, rol, area);

        if (!actualizado) {
            return res.status(404).render("error", { mensaje: "Empleado no encontrado" });
        }

        if (req.xhr || (req.headers.accept?.includes('json'))) {
            return res.json({ mensaje: "Empleado actualizado", empleado: actualizado });
        }

        return res.redirect("/empleados");
    } catch (error) {
        console.error('Error en updateEmpleado:', error);
        res.status(500).render("error", { mensaje: "Error al actualizar empleado" });
    }
}


async function deleteEmpleado(req, res) {
    try {
        const { id } = req.params;

        if (SAMPLE_EMPLOYEE_IDS.includes(id)) {
            return res.status(403).render("error", { mensaje: "Este empleado es de muestra y no se puede modificar." });
        }

        const eliminado = await model.remove(id);

        if (!eliminado) {
            return res.status(404).render("error", { mensaje: "Empleado no encontrado" });
        }

        res.redirect("/empleados");
    } catch (error) {
        console.error('Error en deleteEmpleado:', error);
        res.status(500).render("error", { mensaje: "Error al eliminar empleado" });
    }
}


export default { getEmpleados, getEmpleadoAgregar, getEmpleadoBorrar, getEmpleadoEditar, getEmpleadoById, addEmpleado, updateEmpleado, deleteEmpleado };
