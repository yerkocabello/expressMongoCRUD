'use strict';

const blocking = (req, res) => {
    while(true) {
        //gg
    }
    res.send('should not reach this point');
};

const nonbloking = (req, res) => {
    res.json({message: 'nonblocking call'});
};

module.exports = {
    blocking,
    nonbloking
};