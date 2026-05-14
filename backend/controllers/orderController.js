const Order = require('../models/Order');

exports.createOrder = async(req, res) => {
    try {

        const order = await Order.create(req.body);

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getOrders = async(req, res) => {
    try {

        const orders = await Order.find({
            email: req.params.email
        });

        res.json(orders);

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getAllOrders = async(req, res) => {
    try {

        const orders = await Order.find();

        res.json(orders);

    } catch (error) {
        res.status(500).json(error);
    }
};