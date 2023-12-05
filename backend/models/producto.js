const mongoose = require('mongoose');
const Categoria = require('./categoria');
const {Schema} = mongoose;

const ProductoSchema = Schema({
    nombreProducto: {type: String, required: true},
    descripcion: {type:String, required:true},
    imagen: {type: String, required: true},
    disponible:{type:Boolean, required: true},
    precio: {type:Number, required: true},
    estado: {type:Boolean, required: false},
    categoria: { type: Schema.Types.ObjectId, ref: Categoria, required: true }
})

module.exports = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);