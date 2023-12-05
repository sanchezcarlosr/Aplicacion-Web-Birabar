const Usuario = require('../models/usuario');

/**
 * Controlador para gestionar usuarios.
 * @namespace usuarioCtrl
 */
const usuarioCtrl = {}

const jwt = require('jsonwebtoken');


/**
 * Crea un nuevo usuario.
 * @async
 * @function createUsuario
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se guarda el usuario y se envía la respuesta.
 */
usuarioCtrl.createUsuario = async (request, response) => {
    request.body.estado = true;
    var usuario = new Usuario(request.body);
    try {
        await usuario.save()
        .then(savedUsuario => {
            const userId = savedUsuario._id.toString();
            response.status(201).json({
              status: '1',
              msg: 'Usuario creado y guardado exitosamente.',
              userId: userId
            });
          })
    } catch (error) {
        response.status(400).json({
            status: '0',
            msg: 'Error procesando operacion.'
        })
    }
}

/**
 * Obtiene un usuario existente por su ObjectId.
 * @function getUsuarioById
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se obtiene el usuario y se envía la respuesta.
 */
usuarioCtrl.getUsuarioByUserName = async (request, response) => {
    try {
        const usuario = await Usuario.findOne({ user: request.params.user}).populate('rol');
        response.json(usuario);
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error obteniendo el usuario.',
            error: error.message
        });
    }
}

/**
 * Elimina un usuario existente.
 * @function deleteUsuario
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se elimina el usuario y se envía la respuesta.
 */
usuarioCtrl.deleteUsuario = async (request, response) => {
    try {
        await Usuario.findOneAndUpdate({ _id: request.params.id }, { estado: false });
        response.json({
            status: '1',
            msg: 'Usuario eliminado exitosamente.'
        });
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error eliminando el usuario',
            error: error.message,
        });
    }
}

/**
 * Modifica un usuario existente.
 * @function editUsuario
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se modifica el usuario y se envía la respuesta.
 */
usuarioCtrl.editUsuario = async (request, response) => {
    const vausuario = new Usuario(request.body);
    try {
        await Usuario.updateOne({ _id: request.body._id }, vausuario);
        response.json({
            status: '1',
            msg: 'Usuario modificado exitosamente.'
        });
    }
    catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error modificado el usuario.',
            error: error.message
        });
    }
}

/**
 * Obtiene todos los usuarios activos.
 * @function getUsuarios
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se obtienen los usuarios y se envía la respuesta.
 */
usuarioCtrl.getUsuarios = async (request, response) => {
    try{
        var usuarios = await Usuario.find({ estado: true }).populate('rol');
        response.json(usuarios);
    }
    catch (error) {
    response.status(500).json({
      status: '0',
      msg: 'Error obteniendo todos los usuarios.',
      error: error.message
    });
  }
}

/**
 * Obtiene un usuario existente por su ObjectId.
 * @function getUsuarioById
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se obtiene el usuario y se envía la respuesta.
 */
usuarioCtrl.getUsuarioById = async (request, response) => {
    try {
        const usuario = await Usuario.findOne({ _id: request.params.id, estado:true }).populate('rol');
        response.json(usuario);
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error obteniendo el usuario.',
            error: error.message
        });
    }
}

/**
 * Obtiene un usuario que sera logueado en el sistema.
 * @function loginUsuario
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se obtiene el usuario y se envía la respuesta.
 */
usuarioCtrl.loginUsuario = async (request, response) => {

    const criteria = {
      user: request.body.username,
      password: request.body.password,
      estado: true
    };

    const usuario = await Usuario.findOne(criteria).populate("rol");
    if(!usuario){
        response.json({
        status: 0,
        msg: "Usuario no encontrado." })
    }
    else{
        const unToken = jwt.sign({id: usuario._id}, "secretkey");
        response.json({
            status: 1,
            msg: 'Usuario logueado correctamente.',
            username: usuario.user,
            rol: usuario.rol.nombre,
            userid: usuario._id,
            token: unToken
        });
    }
  }

module.exports = usuarioCtrl;