let UserLogger = require('../loggers/user-logger');

function manageTransaction(req, res) {
    let action = '';
    let message = '';

    if((req.method === 'PUT')&&(req.body._id !== undefined)){
        action = 'U';
        message = req.body;
    }else if((req.method === 'DELETE')&&(req.params.id !== undefined)){
        action = 'D';
        message = req.params.id;
    }else if ((req.method === 'POST')&&(req.params !== undefined)) {
        action = 'C';
        message = req.params;
    }
    if((res.statusCode === 201) || (res.statusCode === 200)){
        UserLogger.userTrxSuccess(message, action);
    }else{
        UserLogger.userTrxFailed(res.statusMessage);
    }
    next();
}

module.exports ={
    manageTransaction
}