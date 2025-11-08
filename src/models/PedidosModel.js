import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({

  cliente: {

    type: String,

    required: true,

    trim: true

  },

  descripcion: {

    type: String,

    required: true,

    trim: true

  },

  precio: {

    type: Number,

    required: true,

    min: 0

  },

  plataforma: {

    type: String,

    required: true,

    trim: true

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



// Obtener todos los pedidos con información del empleado

async function getAll() {

  const pedidos = await Pedido.find()

    .populate('idEmpleado', 'rol area')

    .sort({ createdAt: 1 });

  return pedidos;

}



// Obtener pedido por ID

async function getById(id) {

  const pedido = await Pedido.findById(id)

    .populate('idEmpleado', 'rol area');

  return pedido;

}



// Agregar nuevo pedido

async function add({ cliente, descripcion, precio, plataforma, idEmpleado }) {

  const nuevoPedido = new Pedido({

    cliente,

    descripcion,

    precio: parseFloat(precio),

    plataforma,

    idEmpleado

  });

  const pedidoGuardado = await nuevoPedido.save();

  return await Pedido.findById(pedidoGuardado._id)

    .populate('idEmpleado', 'rol area');

}



// Actualizar un pedido completo

async function update(id, { cliente, descripcion, precio, plataforma, idEmpleado }) {

  const pedidoActualizado = await Pedido.findByIdAndUpdate(

    id,

    {

      cliente,

      descripcion,

      precio: parseFloat(precio),

      plataforma,

      idEmpleado

    },

    { new: true, runValidators: true }

  ).populate('idEmpleado', 'rol area');

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