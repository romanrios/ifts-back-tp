import mongoose from "mongoose";

// Esquema de Pedido
const pedidoSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  plataforma: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plataforma',
    required: true,
  },
  idEmpleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: true
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Modelo de Pedido
const Pedido = mongoose.model('Pedido', pedidoSchema);

// Populates común: Trae nombre/teléfono del cliente, rol/área del empleado, y nombre/tipo de plataforma
const pedidoPopulates = [
    { path: 'cliente', select: 'nombre telefono' }, 
    { path: 'idEmpleado', select: 'rol area' },
    { path: 'plataforma', select: 'nombre tipo' }
];

// Obtener todos los pedidos con información del empleado
async function getAll() {
  const pedidos = await Pedido.find()
    .populate('cliente', 'nombre telefono')
    .populate('idEmpleado', 'rol area')
    .populate('plataforma', 'nombre tipo')
    .populate('producto', 'nombre precio')
    .sort({ createdAt: 1 });
  return pedidos;
}

// Obtener pedido por ID
async function getById(id) {
  const pedido = await Pedido.findById(id)
    .populate('cliente', 'nombre telefono')
    .populate('idEmpleado', 'rol area')
    .populate('plataforma', 'nombre tipo')
    .populate('producto', 'nombre precio');
  return pedido;
}

// Agregar nuevo pedido
async function add({ cliente, producto, precio, plataforma, idEmpleado }) {
  const nuevoPedido = new Pedido({
    cliente,
    producto,
    precio: parseFloat(precio),
    plataforma,
    idEmpleado
  });
  const pedidoGuardado = await nuevoPedido.save();
  return await Pedido.findById(pedidoGuardado._id)
<<<<<<< HEAD
    .populate(pedidoPopulates)
=======
    .populate('cliente', 'nombre telefono')
    .populate('idEmpleado', 'rol area')
    .populate('plataforma', 'nombre tipo')
    .populate('producto', 'nombre precio');
>>>>>>> 55c5536c504fa26f861259a9cd1f47f73244d357
}

// Actualizar un pedido completo
async function update(id, { cliente, producto, precio, plataforma, idEmpleado }) {
  const pedidoActualizado = await Pedido.findByIdAndUpdate(
    id,
    {
      cliente,
      producto,
      precio: parseFloat(precio),
      plataforma,
      idEmpleado
    },
    { new: true, runValidators: true }
<<<<<<< HEAD
  ).populate(pedidoPopulates);
=======
  )
    .populate('cliente', 'nombre telefono')
    .populate('idEmpleado', 'rol area')
    .populate('plataforma', 'nombre tipo')
    .populate('producto', 'nombre precio');
>>>>>>> 55c5536c504fa26f861259a9cd1f47f73244d357
  return pedidoActualizado;
}

// Eliminar pedido
async function remove(id) {
  const pedidoEliminado = await Pedido.findByIdAndDelete(id);
  return pedidoEliminado;
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};