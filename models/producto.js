const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true, unique: true },
    stock: { type: Number, required: true, trim: true, unique: true },
    precio: { type: Number, required: true, trim: true, unique: true },
    imagen: { type: String, required: true, trim: true, unique: true },
    creado: { type: Date, default: Date.now() },
    categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" }
});

// Definir el modelo
module.exports = mongoose.model("Producto", ProductoSchema);