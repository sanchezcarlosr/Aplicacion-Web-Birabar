//defino controlador para el manejo de CRUD
const restobar = require('../models/restobar');
const restobarCtrl = require('./../controllers/restobar.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

router.post('/', restobarCtrl.createRestobar);
router.get('/', restobarCtrl.getRestobar);
router.put('/', restobarCtrl.editRestobar);
router.get('/obtener-restobar/:id', restobarCtrl.getRestobarById);
router.get('/obtener-restobar-por-nombre/:nombre', restobarCtrl.getRestobarByName);
router.delete('/:id', restobarCtrl.deleteRestobar);

module.exports = router;