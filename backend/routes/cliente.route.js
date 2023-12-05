//defino controlador para el manejo de CRUD
const clienteCtrl = require('./../controllers/cliente.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de cliente.
router.get('/', clienteCtrl.getClientes);
router.post('/', clienteCtrl.createCliente);
router.delete('/:id', clienteCtrl.deleteCliente);
router.put('/:id', clienteCtrl.editCliente);
router.get('/obtener-usuario/:id', clienteCtrl.getClienteById);
router.get('/obtener-cliente/:id', clienteCtrl.getClienteByUserId);
router.get('/obtener-clientes-suscripto', clienteCtrl.getClientesSuscripto);
router.get('/obtener-cliente-email/:email', clienteCtrl.getClienteByEmail);
//exportamos el modulo de rutas
module.exports = router;