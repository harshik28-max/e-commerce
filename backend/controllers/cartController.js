const Cart = require('../models/Cart');

exports.getCart = async(req, res) => {
    try {

        const cart = await Cart.findOne({
            email: req.params.email
        });

        res.json(cart);

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.addToCart = async(req, res) => {
    try {

        const { email, product } = req.body;

        let cart = await Cart.findOne({ email });

        if (!cart) {
            cart = await Cart.create({
                email,
                items: [product]
            });
        } else {
            cart.items.push(product);
            await cart.save();
        }

        res.json(cart);

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.removeFromCart = async(req, res) => {
    try {

        const cart = await Cart.findOne({
            email: req.body.email
        });

        cart.items.splice(req.params.index, 1);

        await cart.save();

        res.json(cart);

    } catch (error) {
        res.status(500).json(error);
    }
};