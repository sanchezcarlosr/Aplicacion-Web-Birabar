const calificacionCtrl = require('./../controllers/calificacion.controller');
const autCtrl = require('./../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post('/', calificacionCtrl.createCalificacion);
router.get('/', calificacionCtrl.getCalificaciones);
router.get("/resumen", autCtrl.verifyToken,calificacionCtrl.getResumen);
router.get("/resumenPorFecha",autCtrl.verifyToken,calificacionCtrl.getCalificacionFiltradas);
module.exports = router;
