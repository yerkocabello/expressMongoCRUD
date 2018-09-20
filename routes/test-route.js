'use strict';

const TestController = require('../controllers/test-controller');

let TestApi = require('express').Router({});

TestApi.route('/test/blocking')
    .get(TestController.blocking);

TestApi.route('/test/nonblocking')
    .get(TestController.nonbloking);

module.exports = TestApi;