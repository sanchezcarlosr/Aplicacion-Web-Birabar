const Combo = require('../models/combo');
const comboCtrl = {}


comboCtrl.createCombo = async (request, response) => {
    request.body.estado = true;
    var combo = new Combo(request.body);
    try {
        await combo.save();
        response.status(201).json({
            status: '1',
            msg: 'Combo creado y guardado exitosamente.'
        })
    } catch (error) {
        response.status(400).json({
            status: '0',
            msg: 'Error procesando operacion.'
        })
    }
}

comboCtrl.deleteCombo = async (request, response) => {
    try {
        await Combo.findOneAndUpdate({ _id: request.params.id }, { estado: false });
        response.json({
            status: '1',
            msg: 'Combo eliminado exitosamente.'
        });
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error eliminando el combo',
            error: error.message,
        });
    }
}

comboCtrl.editCombo = async (request, response) => {
    const comboB = new Combo(request.body);
    try {
        await Combo.updateOne({ _id: request.body._id }, comboB);
        response.json({
            status: '1',
            msg: 'Combo modificado exitosamente.'
        });
    }
    catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error modificado el combo',
            error: error.message
        });
    }
}

comboCtrl.getCombos = async (request, response) => {
    try{
        var combos = await Combo.find({ estado: true });
        response.json(combos);
    }
    catch (error) {
    response.status(500).json({
      status: '0',
      msg: 'Error obteniendo todos los combos.',
      error: error.message
    });
  }
}


comboCtrl.getComboById = async (request, response) => {
    try {
        const combo = await Combo.findOne({ _id: request.params.id, estado:true });
        response.json(combo);
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error obteniendo el combo.',
            error: error.message
        });
    }
}

module.exports = comboCtrl;