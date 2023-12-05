const Oferta = require('../models/oferta');

const ofertaCtrl = {}

ofertaCtrl.getOfertas = async (req, res) => {
    var ofertas = await Oferta.find({estado:true});
    res.json(ofertas);
}

ofertaCtrl.getOferta = async (req, res) => {
    let criteria={}
    if(req.params.id!=null){
        criteria._id=req.params.id;
    }
    criteria.estado=true;
    var ofertas = await Oferta.find(criteria);
    res.json(ofertas);
}

ofertaCtrl.createOferta = async (req, res) =>{
    var oferta = new Oferta(req.body);
    try{
        await oferta.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Oferta guardada. '
        })
    }catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

ofertaCtrl.editOferta= async (req, res) => {
    const oferta = new Oferta(req.body);
    try{
        await Oferta.updateOne({_id: req.body._id}, oferta);
        res.status(200).json({
            'status': '1',
            'msg': 'Oferta modificada'
        })
    }catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error en la modificacion de la oferta'
        })
    }
}

ofertaCtrl.deleteOferta = async (req, res) =>{
    try{
        await Oferta.findOneAndUpdate({_id: req.params.id}, {estado: false});
        res.status(200).json({
            'status': '1',
            'msg': 'Oferta eliminada'
        }) 
    }catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = ofertaCtrl;