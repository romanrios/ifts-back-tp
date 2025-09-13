const fs = require("fs");
const path = require("path");

const DB_FILE = "./empleados.json";

const leerDatos = () => {
    const data = fs.readFileSync(DB_FILE, 'utf-8'); 
    return JSON.parse(data);
};

const escribirDatos = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Obtener todos los ítems
function getAll() {
  return leerDatos();
}

// Agregar nuevo pedido
function add(id, descripcion, precio) {
  const pedidos = leerDatos();
  const nuevoPedido = { id: parseInt(id), descripcion, precio };
  pedidos.push(nuevoPedido);
  escribirDatos(pedidos);
  return nuevoPedido;
}

// Actualizar un pedido completo
function update(id, descripcion, precio) {
  const pedidos = leerDatos();
  const index = pedidos.findIndex(t => t.id === parseInt(id));
  if (index === -1) return null;

  pedidos[index] = { id: parseInt(id), descripcion, precio };
  escribirDatos(pedidos);
  return pedidos[index];
}

// Actualizar parcialmente un pedido 
function patch(id, datosParciales) {
  const pedidos = leerDatos(); 
  const index = pedidos.findIndex(t => t.id === parseInt(id));
  if (index === -1) return null;

  pedidos[index] = { ...pedidos[index], ...datosParciales };
  escribirDatos(pedidos);
  return pedidos[index];
}

// Eliminar pedido 
function remove(id) {
  const pedidos = leerDatos();
  const index = pedidos.findIndex(t => t.id === parseInt(id));
  if (index === -1) return null;

  const eliminado = pedidos.splice(index, 1);
  escribirDatos(pedidos);
  return eliminado[0];
}

module.exports = {
  getAll,
  add,
  update,
  patch,
  remove
};