'use strict';

let express = require('express');
let TokenController = require('../controllers/token-controller');

let TokenApi = express.Router({});

TokenApi.post('/token', TokenController.getToken);

module.exports = TokenApi;