'use strict';

let express = require('express');
let UserController = require('../controllers/user-controller');
let JwtMiddleware = require('../middlewares/jwt');
let PermMiddleware = require('../middlewares/perm');
let LoggerMiddleware = require('../middlewares/logger');
let UserApi = express.Router({});

/*Solo los administradores tienen acceso de escritura sobre la base de datos*/
UserApi.route('/users')
    .post(JwtMiddleware.validateJwtHeader,PermMiddleware.hasRole('ADMIN'), UserController.addUser, LoggerMiddleware.manageTransaction)
    .get(JwtMiddleware.validateJwtHeader, UserController.getUsers);

UserApi.route('/users/:id')
    .get(JwtMiddleware.validateJwtHeader, UserController.getUser)
    .put(JwtMiddleware.validateJwtHeader, PermMiddleware.hasRole('ADMIN') , UserController.updateUser, LoggerMiddleware.manageTransaction)
    .delete(JwtMiddleware.validateJwtHeader, PermMiddleware.hasRole('ADMIN'), UserController.deleteUser, LoggerMiddleware.manageTransaction);

module.exports = UserApi;