import mongoose from "mongoose";

// Esquema de Producto
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
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Modelo de Producto
const Producto = mongoose.model('Producto', productoSchema);

// Obtener todos los productos
async function getAll() {
  const productos = await Producto.find().sort({ createdAt: 1 });
  return productos;
}

// Obtener producto por ID
async function getById(id) {
  const producto = await Producto.findById(id);
  return producto;
}

// Agregar nuevo producto
async function add(nombre, precio) {
  const nuevoProducto = new Producto({ nombre, precio });
  const productoGuardado = await nuevoProducto.save();
  return productoGuardado;
}

// Actualizar datos de un producto
async function update(id, nombre, precio) {
  const productoActualizado = await Producto.findByIdAndUpdate(
    id,
    { nombre, precio },
    { new: true, runValidators: true }
  );
  return productoActualizado;
}

// Eliminar producto
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