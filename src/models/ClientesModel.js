import mongoose from "mongoose";

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
};