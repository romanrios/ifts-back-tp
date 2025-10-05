import mongoose from "mongoose";

// Esquema de Empleado
const empleadoSchema = new mongoose.Schema({
  rol: {
    type: String,
    required: true,
    trim: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Modelo de Empleado
const Empleado = mongoose.model('Empleado', empleadoSchema);

// Obtener todos los empleados
async function getAll() {
  const empleados = await Empleado.find().sort({ createdAt: 1 });
  return empleados;
}

// Obtener empleado por ID
async function getById(id) {
  const empleado = await Empleado.findById(id);
  return empleado;
}

// Agregar nuevo empleado
async function add(rol, area) {
  const nuevoEmpleado = new Empleado({ rol, area });
  const empleadoGuardado = await nuevoEmpleado.save();
  return empleadoGuardado;
}

// Actualizar datos de un empleado
async function update(id, rol, area) {
  const empleadoActualizado = await Empleado.findByIdAndUpdate(
    id,
    { rol, area },
    { new: true, runValidators: true }
  );
  return empleadoActualizado;
}

// Eliminar empleado
async function remove(id) {
  const empleadoEliminado = await Empleado.findByIdAndDelete(id);
  return empleadoEliminado;
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};