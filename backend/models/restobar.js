const mongoose = require('mongoose');
const {Schema} = mongoose;

const RestobarSchema = Schema({
    nombreLocal: {type: String, required: true},
    direccionLocal: {type: String, required: true},
    emailLocal: {type: String, required: true},
    telefonoLocal: {type: String, required: true},
    linkTarjeta: {type: String},
    linkPago: {type: String},
    linkTransferencia: { type: String },
    delivery: { type: Boolean },
    abierto: { type: Boolean },
    estado: {type: Boolean}
})

module.exports = mongoose.models.Restobar || mongoose.model('Restobar', RestobarSchema);