const express = require('express');
const cors = require('cors');
const { mongoose } = require('./database');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
//app.use(cors({ origin: 'http://100.24.204.191:4200' }));

//Cargamos el modulo de direccionamiento de rutas
app.use('/api/rol', require('./routes/rol.route.js'));
app.use('/api/usuario', require('./routes/usuario.route.js'));
app.use('/api/cliente', require('./routes/cliente.route.js'));
app.use('/api/combo', require('./routes/combo.route.js'));
app.use('/api/producto', require('./routes/producto.route.js'));
app.use('/api/categoria', require('./routes/categoria.route.js'));
app.use('/api/oferta', require('./routes/oferta.route.js'));
app.use('/api/pedido', require('./routes/pedido.route'));
app.use('/api/calificacion', require('./routes/calificacion.route'));
app.use('/api/detalle-producto', require('./routes/detalleProducto.route'));
app.use('/api/whatsApp', require('./routes/whatsApp.route.js'));
app.use('/api/restobar', require('./routes/restobar.route.js'));
app.use('/api/venta', require('./routes/venta.route.js'));

//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'));
});