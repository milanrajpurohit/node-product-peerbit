/**************************
 AUTHENTICATION SCHEMA INITIALISATION
 **************************/
const Schema    = require('mongoose').Schema;
const bcrypt    = require('bcrypt');
const mongoose  = require('mongoose');

const authtokensSchema = new Schema({

    userId:   { type: Schema.Types.ObjectId, ref: 'users' },
    token:  String,
    createdOn: {type: Date, default: Date.now},
    modifiedOn: {type: Date, default: Date.now},

});

const Authtokens = mongoose.model('authtokens', authtokensSchema);

module.exports = {
    Authtokens,
}

