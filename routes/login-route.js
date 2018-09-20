'use strict';

let express = require('express');

let TokenController = require('../controllers/token-controller');
let LoginController = require('../controllers/login-controller');

let LoginApi = express.Router({});

LoginApi.post("/login", TokenController.getToken);
LoginApi.post("/logout", LoginController.doLogout);

module.exports = LoginApi;