'use strict';

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let env = process.env.NODE_ENV || 'dev';
let config = require('../env/mongo.json')[env];

module.exports = mongoose.connect(config.uri,  config.options);