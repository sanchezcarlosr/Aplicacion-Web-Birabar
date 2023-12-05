//defino controlador para el manejo de CRUD
const ofertaCtrl = require('../controllers/oferta.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de Ofertas
router.get('/', ofertaCtrl.getOfertas);
router.get('/buscarOferta/:id', ofertaCtrl.getOferta); //Busca Oferta por id
router.put('/editarOferta', ofertaCtrl.editOferta);	
router.post('/crearOferta', ofertaCtrl.createOferta);
router.delete('/borrarOferta/:id', ofertaCtrl.deleteOferta); //Eliminacion Logica


//exportamos el modulo de rutas
module.exports = router;