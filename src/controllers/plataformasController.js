import model from "../models/PlataformasModel.js";

async function getPlataformas(req, res) {
    try {
        const plataformas = await model.getAll();
        res.render("plataformas/index", { plataformas });
    } catch (error) {
        console.error('Error en getPlataformas:', error);
        res.status(500).render("error", { mensaje: "Error al obtener plataformas" });
    }
}

function getPlataformaAgregar(req, res) {
    res.render('plataformas/agregar');
}

async function getPlataformaEditar(req, res) {
    try {
        const { id } = req.params;
        const plataforma = await model.getById(id);
        if (!plataforma) {
            return res.status(404).render("error", { mensaje: "Plataforma no encontrada" });
        }
        res.render("plataformas/editar", { plataforma });
    } catch (error) {
        console.error('Error en getPlataformaEditar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener plataforma" });
    }
}

async function getPlataformaBorrar(req, res) {
    try {
        const { id } = req.params;
        const plataforma = await model.getById(id);
        if (!plataforma) {
            return res.status(404).render('error', { mensaje: 'Plataforma no encontrada' });
        }
        res.render('plataformas/borrar', { plataforma });
    } catch (error) {
        console.error('Error en getPlataformaBorrar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener plataforma" });
    }
}

async function getPlataformaById(req, res) {
    try {
        const { id } = req.params;
        const plataforma = await model.getById(id);
        if (!plataforma) {
            return res.status(404).render("error", { mensaje: "Plataforma no encontrada" });
        }
        res.render("plataformas/detalle", { plataforma });
    } catch (error) {
        console.error('Error en getPlataformaById:', error);
        res.status(500).render("error", { mensaje: "Error al obtener plataforma" });
    }
}

async function addPlataforma(req, res) {
    try {
        const { nombre, tipo, comisionPorcentaje } = req.body;
        await model.add(nombre, tipo, comisionPorcentaje);
        res.redirect("/plataformas");
    } catch (error) {
        console.error('Error en addPlataforma:', error);
        res.status(400).render("error", { mensaje: "Error al agregar plataforma. Revise los datos." });
    }
}

async function updatePlataforma(req, res) {
    try {
        const { id } = req.params;
        const { nombre, tipo, comisionPorcentaje } = req.body;

        const actualizado = await model.update(id, nombre, tipo, comisionPorcentaje);

        if (!actualizado) {
            return res.status(404).render("error", { mensaje: "Plataforma no encontrada" });
        }

        return res.redirect("/plataformas");
    } catch (error) {
        console.error('Error en updatePlataforma:', error);
        res.status(500).render("error", { mensaje: "Error al actualizar plataforma" });
    }
}

async function deletePlataforma(req, res) {
    try {
        const { id } = req.params;

        const eliminado = await model.remove(id);

        if (!eliminado) {
            return res.status(404).render("error", { mensaje: "Plataforma no encontrada" });
        }
        
        res.redirect("/plataformas");
    } catch (error) {
        console.error('Error en deletePlataforma:', error);
        res.status(500).render("error", { mensaje: "Error al eliminar plataforma" });
    }
}


export default { 
    getPlataformas, 
    getPlataformaAgregar, 
    getPlataformaBorrar, 
    getPlataformaEditar, 
    getPlataformaById, 
    addPlataforma, 
    updatePlataforma, 
    deletePlataforma 
};