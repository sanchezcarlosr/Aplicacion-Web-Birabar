const mongoose = require('mongoose');
const { Schema } = mongoose;
const Cliente = require('./cliente');
const Calificacion = require('./calificacion');
const DetalleProducto = require('./detalleProducto');

const PedidoSchema = new Schema({
    estado: { type: String },
    demora: { type: String },
    modalidad: { type: String, required: true },
    cliente: { type: Schema.Types.ObjectId, ref: Cliente, required: true },
    detalleProductos:  [{ type: Schema.Types.ObjectId, ref: DetalleProducto, required: true }],
    calificacion: { type: Schema.Types.ObjectId, ref: Calificacion },
    total: { type: Number, required: true},
    formaDePago: { type: String, required: true}
})

module.exports = mongoose.models.Pedido || mongoose.model('Pedido', PedidoSchema);