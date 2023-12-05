//defino controlador para el manejo de CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');
const autCtrl = require('./../controllers/auth.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de usuario.
router.get('/', autCtrl.verifyToken, usuarioCtrl.getUsuarios);
router.get('/:user',usuarioCtrl.getUsuarioByUserName);
//router.post('/', usuarioCtrl.createUsuario);
router.post('/registro', usuarioCtrl.createUsuario);
router.delete('/:id', autCtrl.verifyToken, usuarioCtrl.deleteUsuario);
router.put('/:id', autCtrl.verifyToken, usuarioCtrl.editUsuario);
router.get('/obtener-usuario/:id', usuarioCtrl.getUsuarioById);
router.post('/login', usuarioCtrl.loginUsuario);
//exportamos el modulo de rutas
module.exports = router;