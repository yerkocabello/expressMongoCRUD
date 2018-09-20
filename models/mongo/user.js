let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = Schema({
    id: String,
    username: String,
    password: String,
    image: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    age: { type: Number, min: 0, max: 120 },
    role: {
        id: Number,
        name: String
    }
});

module.exports = mongoose.model('User', UserSchema);