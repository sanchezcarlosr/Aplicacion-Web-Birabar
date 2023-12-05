const DetalleProducto = require('../models/detalleProducto.js');

const detProductoCtrl = {};

detProductoCtrl.createDetalleProducto = async (req, res) => {
    var detProd = new DetalleProducto(req.body);

    try {
        await detProd.save();
        res.json(detProd);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

detProductoCtrl.getDetalleProducto = async (req, res) => {
    const detalles = await DetalleProducto.find();
    res.json(detalles);
}

detProductoCtrl.getDetalleProductoId = async (req, res) => {
    const detalle = await DetalleProducto.findById({_id: req.params.id});
    res.json(detalle);
}

detProductoCtrl.editDetalleProducto = async (req, res) => {
    var detProd = req.body;

    try {
        await DetalleProducto.updateOne({ _id: detProd._id }, detProd);
        res.status(200).json({
            'status': '1',
            'msg': 'Detalle de productos actualizado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

detProductoCtrl.deleteDetalleProducto = async (req, res) => {
    try {
        await DetalleProducto.deleteOne({_id: req.params.id});
        res.status(200).json({
            'status': '1',
            'msg': 'Detalle de productos elimnado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

module.exports = detProductoCtrl;