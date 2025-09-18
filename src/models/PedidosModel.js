const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "..", "data", "pedidos.json");

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

function add({ cliente, descripcion, precio, plataforma, idEmpleado }) {
  const pedidos = leerDatos();
  const ultimoId = pedidos.length > 0 ? pedidos[pedidos.length - 1].id : 0;
  const nuevoPedido = {
    id: ultimoId + 1,
    cliente,
    descripcion,
    precio,
    plataforma,
    idEmpleado,
  };
  pedidos.push(nuevoPedido);
  escribirDatos(pedidos);
  return nuevoPedido;
}

// Actualizar un pedido completo
function update(id, { cliente, descripcion, precio, plataforma, idEmpleado }) {
  const pedidos = leerDatos();
  const index = pedidos.findIndex(t => t.id === parseInt(id));
  if (index === -1) return null;

  pedidos[index] = {
    id: parseInt(id),
    cliente,
    descripcion,
    precio,
    plataforma,
    idEmpleado,
  }; escribirDatos(pedidos);
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