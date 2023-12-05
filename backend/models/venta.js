const mongoose = require('mongoose');
const { Schema } = mongoose;
const Pedido = require('./pedido');

const VentaSchema = new Schema({
    fecha: { type: String, required: true },
    pedido: { type: Schema.Types.ObjectId, ref: Pedido, required: false }
});

module.exports = mongoose.models.Venta || mongoose.model('Venta', VentaSchema);