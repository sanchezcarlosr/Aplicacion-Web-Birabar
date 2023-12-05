/**
 * Clase que representa el rol de un usuario.
 * @typedef {Object} Rol
 * @property {string} nombre - El nombre del rol.
 * @property {boolean} estado - El estado del rol.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const RolSchema = new Schema({
    nombre: { type: String, required: true },
    estado: { type: Boolean}
})
module.exports = mongoose.models.Rol || mongoose.model('Rol', RolSchema);