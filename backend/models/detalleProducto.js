const mongoose = require('mongoose');
const { Schema } = mongoose;
const Producto = require('./producto');

const DetalleProductoSchema = new Schema({
    cantidad: { type: Number, required: true },
    producto:  { type: Schema.Types.ObjectId, ref: Producto, required: true },
    subtotal: { type: Number, required: true }
})

module.exports = mongoose.models.DetalleProducto || mongoose.model('DetalleProducto', DetalleProductoSchema);