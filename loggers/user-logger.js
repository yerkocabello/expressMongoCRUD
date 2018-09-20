'use strict';

const logger = require('../config/logger');
let User = require('../models/mongo/user');


function userTrxSuccess(user, action, next){
    let message = '';
    switch (action){
        case 'U': message = 'User %s successfuly updated!';
        break;
        case 'D': message = 'User %s successfuly deleted!';
        break;
        case 'C': message = 'User %s successfuly created!';
        break;
        default: break;
    }
    logger.log('info', message, JSON.stringify(user));
    next();
}

function userTrxFailed(error, next){
    logger.log('error','There was a problem in the transaction, cause: %s', error);
    next();
}

module.exports ={
    userTrxSuccess,
    userTrxFailed
};