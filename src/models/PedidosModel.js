import mongoose from "mongoose";

// Esquema de Pedido
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
  try {
    const pedidos = await Pedido.find()
      .populate('idEmpleado', 'rol area')
      .sort({ createdAt: 1 });
    return pedidos;
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    throw error;
  }
}

// Obtener pedido por ID
async function getById(id) {
  try {
    const pedido = await Pedido.findById(id)
      .populate('idEmpleado', 'rol area');
    return pedido;
  } catch (error) {
    console.error('Error al obtener pedido por ID:', error);
    throw error;
  }
}

// Agregar nuevo pedido
async function add({ cliente, descripcion, precio, plataforma, idEmpleado }) {
  try {
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
  } catch (error) {
    console.error('Error al agregar pedido:', error);
    throw error;
  }
}

// Actualizar un pedido completo
async function update(id, { cliente, descripcion, precio, plataforma, idEmpleado }) {
  try {
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
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    throw error;
  }
}

// Actualizar parcialmente un pedido
async function patch(id, datosParciales) {
  try {
    // Convertir precio a número si está presente
    if (datosParciales.precio) {
      datosParciales.precio = parseFloat(datosParciales.precio);
    }
    
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      datosParciales,
      { new: true, runValidators: true }
    ).populate('idEmpleado', 'rol area');
    return pedidoActualizado;
  } catch (error) {
    console.error('Error al actualizar parcialmente pedido:', error);
    throw error;
  }
}

// Eliminar pedido
async function remove(id) {
  try {
    const pedidoEliminado = await Pedido.findByIdAndDelete(id);
    return pedidoEliminado;
  } catch (error) {
    console.error('Error al eliminar pedido:', error);
    throw error;
  }
}

export {
  getAll,
  getById,
  add,
  update,
  patch,
  remove
};