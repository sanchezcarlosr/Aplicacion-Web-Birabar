const Calificacion = require('./../models/calificacion');
const moment = require('moment');
const calificacionCtrl = {};

calificacionCtrl.createCalificacion = async (req, res) => {
    const calificacion = new Calificacion(req.body);

    try{
        await calificacion.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Calificacion guardada.',
            calificacion
        })
    }catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

calificacionCtrl.getCalificaciones = async (req, res) => {
    const calificaciones = await Calificacion.find();
    res.json(calificaciones);
}

calificacionCtrl.getResumen = async (req, res) => {
    const calificaciones = await Calificacion.aggregate(
        [
            { $group: { _id: '$puntaje', count: { $sum: 1 } } },
            { $project: { puntaje: '$_id', count: 1, _id: 0 } },
            { $sort: { puntaje: 1 } }
          ]
    ) 
    res.json(calificaciones);
}

calificacionCtrl.getCalificacionFiltradas = async (req, res) => {
    const { fechaDesde, fechaHasta} = req.query;


    try {
      const fechaDesde = req.query.fechaDesde; // Suponiendo que la fecha "desde" se envía como un parámetro de consulta llamado 'desde'
      const fechaHasta = req.query.fechaHasta; // Suponiendo que la fecha "hasta" se envía como un parámetro de consulta llamado 'hasta'

      // Convertir las fechas a objetos Date
      const fechaDesdeDate = moment(fechaDesde, 'DD/MM/YYYY').subtract(24, 'hours').toDate();
      const fechaHastaDate = moment(fechaHasta, 'DD/MM/YYYY').toDate();

      // Realizar la consulta utilizando el preprocesamiento para convertir el campo de fecha a Date y filtrar por rango
      const resultados = await Calificacion.aggregate([
        {
          $addFields: {
            fecha: {
              $dateFromString: {
                dateString: '$fecha',
                format: '%d/%m/%Y',
              },
            },
          },
        },
        {
          $match: {
            fecha: {
              $gte: fechaDesdeDate,
              $lte: fechaHastaDate,
            },
          },
        },
        { $group: { _id: '$puntaje', count: { $sum: 1 } } },
        { $project: { puntaje: '$_id', count: 1, _id: 0 } },
        { $sort: { puntaje: 1 } }
      ]);

      // Hacer algo con los resultados
      res.json(resultados);
    } catch (error) {
      console.error(error);
      // Manejar el error y enviar una respuesta de error apropiada
      res.status(500).json({ error: 'Error al filtrar por fecha' });
    }
  

       
};  

module.exports = calificacionCtrl;