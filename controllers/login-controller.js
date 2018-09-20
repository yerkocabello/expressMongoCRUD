'use strict';

let User = require('../models/mongo/user');
let Jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt-nodejs');

const JwtConfig = require('../config/jwt.json');

function doLogout(req, res) {
    res.status(200).send();
}

module.exports = {
    doLogout
};