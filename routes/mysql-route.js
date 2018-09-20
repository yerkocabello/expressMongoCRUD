'use strict';

const express = require('express');
const User = require('../models/mysql/user');

let mysqlRoute = express.Router({});

mysqlRoute.post("/mysql/user", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        
    })
    .then(() => {
        res.status(201).send();
    })
    .catch(() => {
        res.status(500).send();
    });
});

module.exports = mysqlRoute;