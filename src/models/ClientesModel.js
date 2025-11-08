import mongoose from "mongoose";

<<<<<<< HEAD
const clienteSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true, 
        trim: true 
    },
    telefono: { 
        type: String, 
        required: true, 
        trim: true, 
        unique: true 
    },
    email: { 
        type: String, 
        trim: true, 
        unique: true 
    },
}, { timestamps: true });

const Cliente = mongoose.model('Cliente', clienteSchema);

async function getAll() {
    const clientes = await Cliente.find().sort({ createdAt: -1 });
    return clientes;
}

async function getById(id) {
    const cliente = await Cliente.findById(id);
    return cliente;
}

async function add({ nombre, telefono, email, direccion }) {
    const nuevoCliente = new Cliente({ nombre, telefono, email, direccion });
    const clienteGuardado = await nuevoCliente.save();
    return clienteGuardado;
}

async function update(id, { nombre, telefono, email, direccion }) {
    const clienteActualizado = await Cliente.findByIdAndUpdate(
        id,
        { nombre, telefono, email, direccion },
        { new: true, runValidators: true } // 'new: true' devuelve el documento actualizado
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
=======
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
>>>>>>> 55c5536c504fa26f861259a9cd1f47f73244d357
};