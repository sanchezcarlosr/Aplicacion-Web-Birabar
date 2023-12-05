const Producto = require('../models/producto');
const productoCtrl = {}

productoCtrl.getProductos = async (req, res) => {
    var productos = await Producto.find({estado:true}).populate('categoria');
    res.json(productos);
}

productoCtrl.getProducto = async (req, res) => {
    let criteria={}
    if(req.params.id!=null){
        criteria._id=req.params.id;
        criteria.estado=true;
    }
    var productos = await Producto.find(criteria).populate('categoria');
    res.json(productos);
}

productoCtrl.getProductoCategoria = async (req, res) => {
    let criteria={}
    if(req.params.id!=null){
        criteria.categoria=req.params.id;
        criteria.estado=true;
    }
    var productos = await Producto.find(criteria).populate('categoria');
    res.json(productos);
}

productoCtrl.createProducto = async (req, res) =>{
    var producto = new Producto(req.body);
    producto.estado=true;
    try{
        await producto.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Producto guardado. '
        })
    }catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

productoCtrl.deleteProducto = async (req, res) =>{
    try{
        await Producto.findOneAndUpdate({_id: req.params.id}, {estado: false});
        res.status(200).json({
            'status': '1',
            'msg': 'Producto eliminado'
        }) 
    }catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

productoCtrl.editProducto= async (req, res) => {
    const producto = new Producto(req.body);
    try{
        await Producto.updateOne({_id: req.body._id}, producto);
        res.status(200).json({
            'status': '1',
            'msg': 'Producto modificado'
        })
    }catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error en la modificacion del producto'
        })
    }
}

module.exports = productoCtrl;