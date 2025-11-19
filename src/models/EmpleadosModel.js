import mongoose from "mongoose";

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
  timestamps: true
});

const Empleado = mongoose.model('Empleado', empleadoSchema);

async function getAll() {
  const empleados = await Empleado.find().sort({ createdAt: 1 });
  return empleados;
}

async function getById(id) {
  const empleado = await Empleado.findById(id);
  return empleado;
}

async function add(rol, area) {
  const nuevoEmpleado = new Empleado({ rol, area });
  const empleadoGuardado = await nuevoEmpleado.save();
  return empleadoGuardado;
}

async function update(id, rol, area) {
  const empleadoActualizado = await Empleado.findByIdAndUpdate(
    id,
    { rol, area },
    { new: true, runValidators: true }
  );
  return empleadoActualizado;
}

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