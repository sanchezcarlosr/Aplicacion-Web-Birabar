const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategoriaSchema = Schema({
    nombreCategoria: {type: String, required: true},
    imagen: {type: String, required: true},// url de una imagen para mostrar
    estado: {type: Boolean, required: true}
})

module.exports = mongoose.models.Categoria || mongoose.model('Categoria', CategoriaSchema);