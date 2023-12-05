/**
 * Clase que representa un usuario del sistema.
 * @typedef {Object} Usuario
 * @property {string} user - El nombre de usuario (username) del usuario.
 * @property {string} password - La contraseña del usuario.
 * @property {string} apellido - El apellido del usuario.
 * @property {string} nombre - El nombre real del usuario.
 * @property {mongoose.Types.ObjectId} rol - El ID del rol asociado al usuario.
 * @property {boolean} estado - El estado del usuario (activo\no activo).
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const UsuarioSchema = new Schema({
    user: { type: String, required: true },
    password: { type: String, required: true },
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    rol: { type: Schema.Types.ObjectId, ref: 'Rol', required: true },
    estado: { type: Boolean} 
})
module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);