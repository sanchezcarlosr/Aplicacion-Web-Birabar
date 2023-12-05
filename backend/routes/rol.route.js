//defino controlador para el manejo de CRUD
const rolCtrl = require('./../controllers/rol.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de rol.
router.get('/', rolCtrl.getRoles);
router.post('/', rolCtrl.createRol);
router.delete('/:id', rolCtrl.deleteRol);
router.put('/:id', rolCtrl.editRol);
router.get('/obtener-rol/:id', rolCtrl.getRolById);
router.get('/obtener-rol-por-nombre/:nombre', rolCtrl.getRolByName);
//exportamos el modulo de rutas
module.exports = router;