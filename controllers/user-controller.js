'use strict';

let User = require('../models/mongo/user');
let bcrypt = require('bcrypt-nodejs');

function addUser(req, res, next) {
    let newUser = req.body;
    bcrypt.genSalt(256, (error, salt) => {
        if(error) return req.status(500).send();

        bcrypt.hash(newUser.password, salt, null, (error, newpassword) => {
            newUser.password = newpassword;
            User.create(newUser)
                .then(user => {
                    res.status(201).send();
                    next();
                })
                .catch(error => {
                    res.statusMessage = error.message;
                    res.status(500).send("Ops!");
                    next();
                });
        });
    });
}

function getUsers(req, res) {
    User.find({}).then(users => {
            res.json(users);
    }).catch(error => {
        res.status(500).send();
    });
}

function getUser(req, res) {
    User.findById(req.params.id).then(user => {
        if(user) {
            res.json(user);
        }
        else res.status(404).json({message: 'User not found'});
    }).catch(error =>{
        return res.status(500).json();
    });
}

function updateUser(req, res, next){
    let user = req.body;
    User.updateOne({_id: user._id}, {firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username, age: user.age})
        .then(user => {
            res.status(201).send();
            next();
        })
        .catch(error => {
            res.statusMessage = error.message;
            res.status(500).send();
            next();
        });
}

function deleteUser(req, res, next){
    User.deleteOne({_id: req.params._id})
        .then(user => {
            res.status(200).send();
            next();
        })
        .catch(error => {
            res.statusMessage = error.message;
            res.status(500).send("Error")
            next();
        });
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};