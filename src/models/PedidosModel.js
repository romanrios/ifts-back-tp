import mongoose from "mongoose";

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
  timestamps: true
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

async function getAll() {
  const pedidos = await Pedido.find()
    .populate('cliente', 'nombre telefono')
    .populate('idEmpleado', 'rol area')
    .populate('plataforma', 'nombre tipo')
    .populate('producto', 'nombre precio')
    .sort({ createdAt: 1 });
  return pedidos;
}

async function getById(id) {
  const pedido = await Pedido.findById(id)
    .populate('cliente', 'nombre telefono')
    .populate('idEmpleado', 'rol area')
    .populate('plataforma', 'nombre tipo')
    .populate('producto', 'nombre precio');
  return pedido;
}

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
    .populate('cliente', 'nombre telefono')
    .populate('idEmpleado', 'rol area')
    .populate('plataforma', 'nombre tipo')
    .populate('producto', 'nombre precio');
}

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
  )
    .populate('cliente', 'nombre telefono')
    .populate('idEmpleado', 'rol area')
    .populate('plataforma', 'nombre tipo')
    .populate('producto', 'nombre precio');
  return pedidoActualizado;
}

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