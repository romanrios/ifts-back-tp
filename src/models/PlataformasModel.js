import mongoose from "mongoose";

const plataformaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    tipo: {
        type: String,
        enum: ['Externa', 'Propia', 'Teléfono', 'Presencial'], 
        default: 'Externa',
        required: true
    },
    comisionPorcentaje: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
}, {
    timestamps: true 
});

const Plataforma = mongoose.model('Plataforma', plataformaSchema);

async function getAll() {
    const plataformas = await Plataforma.find().sort({ nombre: 1 });
    return plataformas;
}

async function getById(id) {
    const plataforma = await Plataforma.findById(id);
    return plataforma;
}

async function add(nombre, tipo, comisionPorcentaje = 0) {
    const nuevaPlataforma = new Plataforma({ nombre, tipo, comisionPorcentaje });
    const plataformaGuardada = await nuevaPlataforma.save();
    return plataformaGuardada;
}

async function update(id, nombre, tipo, comisionPorcentaje) {
    const plataformaActualizada = await Plataforma.findByIdAndUpdate(
        id,
        { nombre, tipo, comisionPorcentaje },
        { new: true, runValidators: true }
    );
    return plataformaActualizada;
}

async function remove(id) {
    const plataformaEliminada = await Plataforma.findByIdAndDelete(id);
    return plataformaEliminada;
}

export default {
    getAll,
    getById,
    add,
    update,
    remove
};