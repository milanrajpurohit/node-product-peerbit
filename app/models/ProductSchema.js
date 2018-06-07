/*******************************
 PRODUCT SCHEMA INITIALISATION
 *******************************/
const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const productSchema = new Schema({

    name:           { type: String },
    description:    { type: String },
    manufacturer:   { type: String },
    price:          Number,
    categoryId:     Number,
    createdOn:      { type: Date, default: Date.now },
    modifiedOn:     { type: Date, default: Date.now }

});

const Product = mongoose.model('products', productSchema);

module.exports = {
    Product
}

