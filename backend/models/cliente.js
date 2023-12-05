/**
 * Clase que representa un cliente del sistema.
 * @typedef {Object} Cliente
 * @property {string} direccion - La dirección de residencia del cliente.
 * @property {string} email - La dirección de correo electrónico del cliente.
 * @property {string} telefono - El teléfono del cliente.
 * @property {mongoose.Types.ObjectId} usuario - El ID del rol asociado al cliente.
 * @property {boolean} estado - El estado del cliente (activo\no activo).
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const ClienteSchema = new Schema({
    direccion: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    suscripto: { type: Boolean},
})
module.exports = mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);