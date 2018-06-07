/*******************************
 USER SCHEMA INITIALISATION
 *******************************/
const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const userSchema = new Schema({

    email:      { type: String },
    password:   { type: String },
    name:       { type: String },
    createdOn:  { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }

});

const User = mongoose.model('users', userSchema);

module.exports = {
    User
}

