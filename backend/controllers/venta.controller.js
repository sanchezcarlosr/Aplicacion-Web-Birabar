const Venta = require('./../models/venta');
const Cliente = require('./../models/cliente');
const Pedido = require('../models/pedido');
const Producto = require('../models/producto');

const ventaCtrl = {};

ventaCtrl.createVenta = async (req, res) => {
    const venta = new Venta(req.body);

    try {
        await venta.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Pedido guardado.',
            venta
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

ventaCtrl.getVentas = async (req, res) => {
    const ventas = await Venta.find().populate({ path: 'pedido', populate: { path: 'cliente', populate: 'usuario' } })
        .populate({ path: 'pedido', populate: { path: 'calificacion' } })
        .populate({ path: 'pedido', populate: { path: 'detalleProductos', populate: { path: 'producto', populate: { path: 'categoria' } } } });
    res.json(ventas);
}

ventaCtrl.getVentaById = async (req, res) => {
    const venta = await Venta.find({ _id: req.params.id }).populate({ path: 'pedido', populate: { path: 'cliente', populate: 'usuario' } })
        .populate({ path: 'pedido', populate: { path: 'calificacion' } })
        .populate({ path: 'pedido', populate: { path: 'detalleProductos', populate: { path: 'producto', populate: { path: 'categoria' } } } });
    res.json(venta);
}

ventaCtrl.getVentasFiltradas = async (req, res) => {
    const { fechaDesde, fechaHasta, usuario } = req.query;

    try {
        let filtro = {};

        if (fechaDesde && fechaHasta) {
            filtro.fecha = {
                $gte: fechaDesde,
                $lte: fechaHasta
            };
        } else if (fechaDesde) {
            filtro.fecha = {
                $gte: fechaDesde
            };
        } else if (fechaHasta) {
            filtro.fecha = {
                $lte: fechaHasta
            };
        }

        if (usuario) {
            filtro = {
                ...filtro,
                'pedido.cliente.usuario.user': usuario
            };
        }     

        const ventasFiltradas = await Venta.aggregate([
            {
                $lookup: {
                    from: 'pedidos',
                    localField: 'pedido',
                    foreignField: '_id',
                    as: 'pedido'
                }
            },
            {
                $unwind: '$pedido'
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'pedido.cliente',
                    foreignField: '_id',
                    as: 'pedido.cliente'
                }
            },
            {
                $unwind: '$pedido.cliente'
            },
            {
                $lookup: {
                    from: 'usuarios',
                    localField: 'pedido.cliente.usuario',
                    foreignField: '_id',
                    as: 'pedido.cliente.usuario'
                }
            },
            {
                $unwind: '$pedido.cliente.usuario'
            },
            {
                $match: filtro
            }
        ]);

        await Venta.populate(ventasFiltradas, {
            path: 'pedido',
            populate: [
                { path: 'cliente', populate: { path: 'usuario' } },
                { path: 'calificacion' },
                { path: 'detalleProductos', populate: { path: 'producto', populate: { path: 'categoria' } } }
            ]
        });        
        
        res.json(ventasFiltradas);
    } catch (error) {
        console.error('Error al filtrar las ventas:', error);
        res.status(500).json({ message: 'Error al filtrar las ventas' });
    }
 
};  
ventaCtrl.getVentasResumen = async (req, res) => {
    try {
      const resultados = await Venta.aggregate([
        {
          $addFields: {
            fecha: {
              $dateFromString: {
                dateString: "$fecha",
                format: "%Y-%m-%d"
              }
            }
          }
        },
        {
          $match: {
            $expr: {
              $eq: [{ $year: "$fecha" }, 2023]
            }
          }
        },
        {
          $group: {
            _id: { $month: "$fecha" },
            cantidad: { $sum: 1 }
          }
        }
        ,
      {
        $sort: { _id: 1 } // Orden ascendente por _id
      }
      ]);
  
      res.json(resultados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al filtrar por fecha" });
    }
  };
  

  
   

   ventaCtrl.getVentasPorMes = async (req, res) => {
    let mes = parseInt(req.params.mes);
    let filtro = {};
    if (mes >= 1 && mes <= 12) {
        filtro = {
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, 2023] },
              { $eq: [{ $month: "$fecha" }, mes] }
            ]
          }
        }
      } else  {
        filtro = {
          $expr: {
            $eq: [{ $year: "$fecha" }, 2023]
          }
        };
    }

    try {
      const ventas = await Venta.aggregate([
        {
          $addFields: {
            fecha: {
              $dateFromString: {
                dateString: "$fecha",
                format: "%Y-%m-%d"
              }
            }
          }
        },
        {
          $match: filtro
        },
        {
          $lookup: {
            from: "pedidos",
            localField: "pedido",
            foreignField: "_id",
            as: "detallePedido"
          }
        },
        {
          $unwind: "$detallePedido"
        }
      ]);
  
      const ventasPopulated = await Promise.all(ventas.map(async (venta) => {
        const detalleProductosPopulated = await Pedido.populate(venta.detallePedido, {
          path: "detalleProductos",
          populate: {
            path: "producto",
            model: Producto
          }
        });
        venta.detallePedido.detalleProductos = detalleProductosPopulated.detalleProductos;
        return venta;
      }));
  
      // Resumen de la cantidad de productos vendidos
    const productosVendidos = {};
    ventasPopulated.forEach((venta) => {
      venta.detallePedido.detalleProductos.forEach((detalleProducto) => {
        const productoId = detalleProducto.producto._id.toString();
        const cantidad = detalleProducto.cantidad;
        if (productosVendidos[productoId]) {
          productosVendidos[productoId].cantidad += cantidad;
          productosVendidos[productoId].veces++;
        } else {
          productosVendidos[productoId] = {
            cantidad: cantidad,
            veces: 1,
            nombre: detalleProducto.producto.nombreProducto
          };
        }
      });
    });

    const resumenArray = Object.values(productosVendidos);
 // Ordenar el arreglo por la cantidad de ventas en orden descendente
 resumenArray.sort((a, b) => b.cantidad - a.cantidad);

 const ventasLimitadas = resumenArray.slice(0, 10); // Limitar a las primeras 10 posiciones

 res.json(ventasLimitadas);
   

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al filtrar por fecha" });
    }
  };


  ventaCtrl.getVentasCliente = async (req, res) => {
    let mes = parseInt(req.params.mes);
    let filtro = {};
    if (mes >= 1 && mes <= 12) {
        filtro = {
          $expr: {
            $and: [
              { $eq: [{ $year: "$fecha" }, 2023] },
              { $eq: [{ $month: "$fecha" }, mes] }
            ]
          }
        }
      } else  {
        filtro = {
          $expr: {
            $eq: [{ $year: "$fecha" }, 2023]
          }
        };
    }
    try {
      const ventas = await Venta.aggregate([
        {
          $addFields: {
            fecha: {
              $dateFromString: {
                dateString: "$fecha",
                format: "%Y-%m-%d"
              }
            }
          }
        },
        {
          $match: filtro
        },
        {
          $lookup: {
            from: "pedidos",
            localField: "pedido",
            foreignField: "_id",
            as: "pedido"
          }
        },
        {
          $unwind: "$pedido"
        },
        {
          $lookup: {
            from: "clientes",
            localField: "pedido.cliente",
            foreignField: "_id",
            as: "pedido.cliente"
          }
        },
        {
          $unwind: "$pedido.cliente"
        },
        {
          $lookup: {
            from: "usuarios",
            localField: "pedido.cliente.usuario",
            foreignField: "_id",
            as: "pedido.cliente.usuario"
          }
        },
        {
          $unwind: "$pedido.cliente.usuario"
        },
        {
          $group: {
            _id: "$pedido.cliente._id",
            cliente: { $first: "$pedido.cliente" },
            totalCompras: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            cliente: {
              _id: "$cliente._id",
              direccion: "$cliente.direccion",
              email: "$cliente.email",
              telefono: "$cliente.telefono",
              usuario: "$cliente.usuario.user",
              apellido: "$cliente.usuario.apellido",
              nombre: "$cliente.usuario.nombre"
            },
            totalCompras: 1
          }
        }
      ]);
  
      ventas.sort((a, b) => b.totalCompras - a.totalCompras);
      const ventasLimitadas = ventas.slice(0, 10); // Limitar a las primeras 10 posiciones
      res.json(ventasLimitadas);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al filtrar por fecha" });
    }
  };
  
module.exports = ventaCtrl;