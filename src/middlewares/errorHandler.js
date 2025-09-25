export const notFoundHandler = (req, res, next) => {
    res.status(404).render("error", { mensaje: "La ruta que buscas no existe." });
};

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error", { mensaje: "Ocurrió un problema inesperado. Intenta más tarde." });
};
