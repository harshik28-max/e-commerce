const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    email: String,

    items: Array

});

module.exports = mongoose.model(
    'Cart',
    cartSchema
);