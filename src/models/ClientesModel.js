import mongoose from "mongoose";

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
  timestamps: true
});

const Cliente = mongoose.model('Cliente', clienteSchema);

async function getAll() {
  const clientes = await Cliente.find().sort({ createdAt: 1 });
  return clientes;
}

async function getById(id) {
  const cliente = await Cliente.findById(id);
  return cliente;
}

async function add(nombre, telefono) {
  const nuevoCliente = new Cliente({ nombre, telefono });
  const clienteGuardado = await nuevoCliente.save();
  return clienteGuardado;
}

async function update(id, nombre, telefono) {
  const clienteActualizado = await Cliente.findByIdAndUpdate(
    id,
    { nombre, telefono },
    { new: true, runValidators: true }
  );
  return clienteActualizado;
}

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