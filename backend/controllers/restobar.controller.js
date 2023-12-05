const Restobar = require('../models/restobar');
const restobarCtrl = {}

restobarCtrl.createRestobar = async (req, res) =>{
    var restobar = new Restobar(req.body);
    restobar.estado = true;
    try{
        await restobar.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Datos del restobar guardados. '
        })
    }catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

restobarCtrl.getRestobar = async (req, res) => {
    var restobar = await Restobar.find({estado:true});
    res.json(restobar);
}

restobarCtrl.editRestobar= async (req, res) => {
    const restobar = new Restobar(req.body);
    try{
        await Restobar.updateOne({_id: req.body._id}, restobar);
        res.status(200).json({
            'status': '1',
            'msg': 'Datos del Restobar modificados.'
        })
    }catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error en la modificacion de los datos del Restobar'
        })
    }
}

restobarCtrl.getRestobarById = async (request, response) => {
    try {
        const restobar = await Restobar.findOne({ _id: request.params.id, estado:true });
        response.json(restobar);
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error obteniendo el restobar.',
            error: error.message
        });
    }
}

restobarCtrl.getRestobarByName = async (request, response) => {
    try {
        const nombre = request.params.nombre;
        const regex = new RegExp(nombre, 'i');
        const restobar = await Restobar.findOne({ nombreLocal: { $regex: regex }, estado: true });
        response.json(restobar);
    } catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error obteniendo el restobar.',
            error: error.message
        });
    }
};

restobarCtrl.deleteRestobar = async (request, response) => {
    try {
        await Restobar.findOneAndUpdate({ _id: request.params.id }, { estado: false });
        response.json({
            status: '1',
            msg: 'Restobar eliminado exitosamente.'
        });
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error eliminando el restobar',
            error: error.message,
        });
    }
}


module.exports = restobarCtrl;