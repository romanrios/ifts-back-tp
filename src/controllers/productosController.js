import model from "../models/ProductosModel.js";

const SAMPLE_PRODUCT_IDS = [
    "68f6b3d0f4ae604d2e8fd822",
    "68f6c3eff4ae604d2e8fd83c",
    "68f6c406f4ae604d2e8fd83f",
    "68f6c434f4ae604d2e8fd842"
];

async function getProductos(req, res) {
    try {
        const productos = await model.getAll();
        res.render("productos/index", { productos: productos });
    } catch (error) {
        console.error('Error en getProductos:', error);
        res.status(500).render("error", { mensaje: "Error al obtener productos" });
    }
}

function getProductoAgregar(req, res) {
    res.render('productos/agregar')
}

async function getProductoEditar(req, res) {
    try {
        const { id } = req.params;
        const producto = await model.getById(id);
        if (!producto) {
            return res.status(404).render("error", { mensaje: "Producto no encontrado" });
        }
        res.render("productos/editar", { producto });
    } catch (error) {
        console.error('Error en getProductoEditar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener producto" });
    }
}

async function getProductoBorrar(req, res) {
    try {
        const { id } = req.params;
        const producto = await model.getById(id);
        if (!producto) {
            return res.status(404).render('error', { mensaje: 'Producto no encontrado' });
        }
        res.render('productos/borrar', { producto });
    } catch (error) {
        console.error('Error en getProductoBorrar:', error);
        res.status(500).render("error", { mensaje: "Error al obtener producto" });
    }
}

async function getProductoById(req, res) {
    try {
        const { id } = req.params;
        const producto = await model.getById(id);
        if (!producto) {
            return res.status(404).render("error", { mensaje: "Producto no encontrado" });
        }
        res.render("productos/detalle", { producto: producto });
    } catch (error) {
        console.error('Error en getProductoById:', error);
        res.status(500).render("error", { mensaje: "Error al obtener producto" });
    }
}

async function addProducto(req, res) {
    try {
        const { nombre, precio } = req.body;
        await model.add(nombre, precio);
        res.redirect("/productos");
    } catch (error) {
        console.error('Error en addProducto:', error);
        res.status(500).render("error", { mensaje: "Error al agregar producto" });
    }
}

async function updateProducto(req, res) {
    try {
        const { id } = req.params;
        const { nombre, precio } = req.body;

        // Evitar edición de muestras
        if (SAMPLE_PRODUCT_IDS.includes(id)) {
            return res.status(403).render("error", { mensaje: "Este producto es de muestra y no se puede modificar." });
        }

        const actualizado = await model.update(id, nombre, precio);

        if (!actualizado) {
            return res.status(404).render("error", { mensaje: "Producto no encontrado" });
        }

        // Devuelve JSON si la petición lo solicita, si no redirige
        if (req.xhr || (req.headers.accept?.includes('json'))) {
            return res.json({ mensaje: "Producto actualizado", producto: actualizado });
        }

        return res.redirect("/productos");
    } catch (error) {
        console.error('Error en updateProducto:', error);
        res.status(500).render("error", { mensaje: "Error al actualizar producto" });
    }
}


async function deleteProducto(req, res) {
    try {
        const { id } = req.params;

        // Evitar borrado de muestras
        if (SAMPLE_PRODUCT_IDS.includes(id)) {
            return res.status(403).render("error", { mensaje: "Este producto es de muestra y no se puede modificar." });
        }

        const eliminado = await model.remove(id);

        if (!eliminado) {
            return res.status(404).render("error", { mensaje: "Producto no encontrado" });
        }

        res.redirect("/productos");
    } catch (error) {
        console.error('Error en deleteProducto:', error);
        res.status(500).render("error", { mensaje: "Error al eliminar producto" });
    }
}


export default { getProductos, getProductoAgregar, getProductoBorrar, getProductoEditar, getProductoById, addProducto, updateProducto, deleteProducto };
