'use strict';

let Jwt = require('jsonwebtoken');
let moment = require('moment');

const JwtConfig = require('../config/jwt.json');

function validateJwtHeader(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).json({message: 'Authorization must be present'});
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');

    let payload;

    try {
        payload = Jwt.verify(token, JwtConfig.secretKey);
        if(payload.exp <= moment().unix()) {
            return res.status(401).json({message: 'Expired Token'});
        }
    } catch (ex) {
        return res.status(500).json({message: 'Error parsing token'});
    }
    
    req.user_context = payload;

    next();

}

module.exports = {
    validateJwtHeader
};