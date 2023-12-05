const categoriaCtrl = require('./../controllers/categoria.controller');

const express = require('express');
const router = express.Router();

router.post('/', categoriaCtrl.createCategoria);
router.get('/:id', categoriaCtrl.getCategoria);
router.get('/', categoriaCtrl.getCategorias);
router.put('/update', categoriaCtrl.updateCategoria);
router.put('/delete/:id', categoriaCtrl.deleteCategoria);

module.exports = router;