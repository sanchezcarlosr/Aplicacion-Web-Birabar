//defino controlador para el manejo de CRUD
const pedidoCtrl = require('./../controllers/pedido.controller.js');
const autCtrl = require('./../controllers/auth.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.post('/', pedidoCtrl.createPedido);
router.get('/all', pedidoCtrl.getPedidos);
router.get('/id/:id', pedidoCtrl.getPedidoId);
router.get('/filtrar', pedidoCtrl.getPedidosEstado);
router.put('/modificar', autCtrl.verifyToken, pedidoCtrl.editPedido);
router.delete('/eliminar/:id', autCtrl.verifyToken, pedidoCtrl.deletePedido);
router.get('/cliente/:idCliente', pedidoCtrl.getPedidosCliente);
router.get('/filtrados', autCtrl.verifyToken, pedidoCtrl.getPedidosFiltrados);

//exportamos el modulo de rutas
module.exports = router;