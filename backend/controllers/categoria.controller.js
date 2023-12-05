const Categoria = require('./../models/categoria');
const Producto = require('./../models/producto');
const productoCtrl = require('./../controllers/producto.controller');

const categoriaCtrl = {};

categoriaCtrl.createCategoria = async (req, res) => {
    try{
        var categoria = new Categoria(req.body);
        categoria.estado=true;
        await categoria.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Categoria guardada. '
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

categoriaCtrl.getCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById({_id: req.params.id});
        res.json(categoria);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

categoriaCtrl.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find( { estado: true } );
        res.json(categorias);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

categoriaCtrl.updateCategoria = async (req, res) => {
    try{
        const categoria = new Categoria(req.body);
        await Categoria.updateOne({_id: req.body._id}, categoria);
        res.status(200).json({
            'status': '1',
            'msg': 'Categoria actualizada. '
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

categoriaCtrl.deleteCategoria = async (req, res) => {
    try {
        const categoriaId = req.params.id;
        const Producto = require('./../models/producto');
        const productos= await Producto.find({categoria: categoriaId, estado: true});
        if(productos.length>0){
            res.status(200).json({
                'status': '0',
                'msg': "Error al intentar eliminar una categoria"
            });
        }else{
            await Categoria.findOneAndUpdate({_id: categoriaId}, {estado: false});
            res.status(200).json({
                'status': '1',
                'msg': 'Categoría y productos eliminados.'
            });
        }
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': "Error al intentar eliminar una categoria"
        });
    }
};


module.exports = categoriaCtrl;