import mongoose from "mongoose";

// Esquema de Cliente
const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  telefono: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Modelo de Cliente
const Cliente = mongoose.model('Cliente', clienteSchema);

// Obtener todos los clientes
async function getAll() {
  const clientes = await Cliente.find().sort({ createdAt: 1 });
  return clientes;
}

// Obtener cliente por ID
async function getById(id) {
  const cliente = await Cliente.findById(id);
  return cliente;
}

// Agregar nuevo cliente
async function add(nombre, telefono) {
  const nuevoCliente = new Cliente({ nombre, telefono });
  const clienteGuardado = await nuevoCliente.save();
  return clienteGuardado;
}

// Actualizar datos de un cliente
async function update(id, nombre, telefono) {
  const clienteActualizado = await Cliente.findByIdAndUpdate(
    id,
    { nombre, telefono },
    { new: true, runValidators: true }
  );
  return clienteActualizado;
}

// Eliminar cliente
async function remove(id) {
  const clienteEliminado = await Cliente.findByIdAndDelete(id);
  return clienteEliminado;
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};