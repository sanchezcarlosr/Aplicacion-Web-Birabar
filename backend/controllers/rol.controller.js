const Rol = require('../models/rol');

/**
 * Controlador para gestionar roles.
 * @namespace rolCtrl
 */
const rolCtrl = {}

/**
 * Crea un nuevo rol.
 * @async
 * @function createRol
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se guarda el rol y se envía la respuesta.
 */
rolCtrl.createRol = async (request, response) => {
    request.body.estado = true;
    var rol = new Rol(request.body);
    try {
        await rol.save();
        response.status(201).json({
            status: '1',
            msg: 'Rol creado y guardado exitosamente.'
        })
    } catch (error) {
        response.status(400).json({
            status: '0',
            msg: 'Error procesando operacion.'
        })
    }
}

/**
 * Elimina un rol existente.
 * @function deleteRol
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se elimina el rol y se envía la respuesta.
 */
rolCtrl.deleteRol = async (request, response) => {
    try {
        await Rol.findOneAndUpdate({ _id: request.params.id }, { estado: false });
        response.json({
            status: '1',
            msg: 'Rol eliminado exitosamente.'
        });
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error eliminando el rol',
            error: error.message
        });
    }
}

/**
 * Modifica un rol existente.
 * @function editRol
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se modifica el rol y se envía la respuesta.
 */
rolCtrl.editRol = async (request, response) => {
    const varol = new Rol(request.body);
    try {
        await Rol.updateOne({ _id: request.body._id }, varol);
        response.json({
            status: '1',
            msg: 'Rol modificado exitosamente.'
        });
    }
    catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error modificado el rol.',
            error: error.message
        });
    }
}

/**
 * Obtiene todos los roles activos.
 * @function getRoles
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se obtienen los roles y se envía la respuesta.
 */
rolCtrl.getRoles = async (request, response) => {
    try{
        var roles = await Rol.find({ estado: true });
        response.json(roles);
    }
    catch (error) {
    response.status(500).json({
      status: '0',
      msg: 'Error obteniendo todos los roles.',
      error: error.message
    });
  }
}

/**
 * Obtiene un rol existente por su ObjectId.
 * @function getRolById
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se obtiene el rol y se envía la respuesta.
 */
rolCtrl.getRolById = async (request, response) => {
    try {
        const rol = await Rol.findOne({_id: request.params.id, estado:true});
        response.json(rol);
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error obteniendo el rol.',
            error: error.message
        });
    }
}

/**
 * Obtiene un rol existente por su nombre.
 * @function getRolByName
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se obtiene el rol y se envía la respuesta.
 */
rolCtrl.getRolByName = async (request, response) => {
    try {
        const rol = await Rol.findOne({nombre: request.params.nombre, estado:true});
        response.json(rol);
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error obteniendo el rol.',
            error: error.message
        });
    }
}

module.exports = rolCtrl;