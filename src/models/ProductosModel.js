import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  precio: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true 
});

const Producto = mongoose.model('Producto', productoSchema);

async function getAll() {
  const productos = await Producto.find().sort({ createdAt: 1 });
  return productos;
}

async function getById(id) {
  const producto = await Producto.findById(id);
  return producto;
}

async function add(nombre, precio) {
  const nuevoProducto = new Producto({ nombre, precio });
  const productoGuardado = await nuevoProducto.save();
  return productoGuardado;
}

async function update(id, nombre, precio) {
  const productoActualizado = await Producto.findByIdAndUpdate(
    id,
    { nombre, precio },
    { new: true, runValidators: true }
  );
  return productoActualizado;
}

async function remove(id) {
  const productoEliminado = await Producto.findByIdAndDelete(id);
  return productoEliminado;
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};