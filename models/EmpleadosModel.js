const fs = require("fs");
const path = require("path");

const DB_FILE = "./data/empleados.json";

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

// Agregar nuevo empleado
function add(id, rol, area) {
  const empleados = leerDatos();
  const nuevoEmpleado = { id: parseInt(id), rol, area };
  empleados.push(nuevoEmpleado);
  escribirDatos(empleados);
  return nuevoEmpleado;
}

// Actualizar datos de un empleado
function update(id, rol, area) {
  const empleados = leerDatos();
  const index = empleados.findIndex(e => e.id === parseInt(id));
  if (index === -1) return null;

  empleados[index] = { id: parseInt(id), rol, area };
  escribirDatos(empleados);
  return empleados[index];
}

// Actualizar parcialmente un empleado
function patch(id, datosParciales) {
  const empleados = leerDatos();
  const index = empleados.findIndex(e => e.id === parseInt(id));
  if (index === -1) return null;

  empleados[index] = { ...empleados[index], ...datosParciales };
  escribirDatos(empleados);
  return empleados[index];
}

// Eliminar empleado
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