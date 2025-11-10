import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000, // evita que se cuelgue indefinidamente
        });
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error.message);
        // process.exit(1); 
        // Detiene el servidor si no conecta -- lo sacamos para que no se caiga toda la app
    }
};

export default connectDB;
