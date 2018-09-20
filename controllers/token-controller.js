'use strict';

let User = require('../models/mongo/user');
let Jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt-nodejs');

const JwtConfig = require('../config/jwt.json');

function getToken(req, res) {
    User.findOne({username: req.body.username})
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, (errorCompare, isCorrectPassword) => {
                if (errorCompare) return res.status(500).send();

                if(user && isCorrectPassword) {
                    res.json({access_token: createToken(user)});
                } else {
                    res.status(400).json({message: 'Username or Password are invalid'});
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send();
        });
}

function createToken(user) {
    return Jwt.sign({
        role: user.role.name,
        sub: user.username,
        exp: Math.floor(Date.now() / 1000) + (60 * JwtConfig.duration),
    }, JwtConfig.secretKey);
}


module.exports = {
    getToken
};