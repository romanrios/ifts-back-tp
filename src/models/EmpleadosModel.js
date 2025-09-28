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
  try {
    const empleados = await Empleado.find().sort({ createdAt: 1 });
    return empleados;
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    throw error;
  }
}

// Obtener empleado por ID
async function getById(id) {
  try {
    const empleado = await Empleado.findById(id);
    return empleado;
  } catch (error) {
    console.error('Error al obtener empleado por ID:', error);
    throw error;
  }
}

// Agregar nuevo empleado
async function add(rol, area) {
  try {
    const nuevoEmpleado = new Empleado({ rol, area });
    const empleadoGuardado = await nuevoEmpleado.save();
    return empleadoGuardado;
  } catch (error) {
    console.error('Error al agregar empleado:', error);
    throw error;
  }
}

// Actualizar datos de un empleado
async function update(id, rol, area) {
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      id,
      { rol, area },
      { new: true, runValidators: true }
    );
    return empleadoActualizado;
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    throw error;
  }
}

// Eliminar empleado
async function remove(id) {
  try {
    const empleadoEliminado = await Empleado.findByIdAndDelete(id);
    return empleadoEliminado;
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    throw error;
  }
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};