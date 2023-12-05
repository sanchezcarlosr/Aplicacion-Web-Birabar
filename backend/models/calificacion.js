const mongoose = require('mongoose');
const { Schema } = mongoose;

const Pedido = require('./pedido');

const CalificacionSchema = new Schema ({
    puntaje: { type: Number, required: true},
    observacion: { type: String },
    fecha: { type: String, required: true },
});

module.exports = mongoose.models.Calificacion || mongoose.model('Calificacion', CalificacionSchema);