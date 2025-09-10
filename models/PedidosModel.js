const pedidos = require("../data/pedido");

// Obtener todos los ítems
function getAll() {
    return pedidos;
}

// Agregar nuevo pedido
function add(id, descripcion, precio) {
    const nuevoPedido = { id: parseInt(id), descripcion, precio };
    pedidos.push(nuevoPedido);
    return nuevoPedido;
}

// Actualizar un pedido completo
function update(id, descripcion, precio) {
    const index = pedidos.findIndex(t => t.id === parseInt(id));
    if (index === -1) return null;

    pedidos[index] = { id: parseInt(id), descripcion,precio };
    return pedidos[index];
}

// Actualizar parcialmente un pedido  
function patch(id, datosParciales) {
    const index = pedidos.findIndex(t => t.id === parseInt(id));
    if (index === -1) return null;

    pedidos[index] = { ...pedidos[index], ...datosParciales };
    return pedidos[index];
}

// Eliminar pedido 
function remove(id) {
    const index = pedidos.findIndex(t => t.id === parseInt(id));
    if (index === -1) return null;

    const eliminado = pedidos.splice(index, 1);
    return eliminado[0];
}

module.exports = {
    getAll,
    add,
    update,
    patch,
    remove
};
