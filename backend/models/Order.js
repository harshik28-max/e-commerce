const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    email: String,

    items: Array,

    total: Number,

    paymentMethod: String,

    status: {
        type: String,
        default: 'Confirmed'
    },

    date: String

});

module.exports = mongoose.model(
    'Order',
    orderSchema
);