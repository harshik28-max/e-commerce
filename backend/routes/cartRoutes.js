const express = require('express');

const router = express.Router();

const {
    getCart,
    addToCart,
    removeFromCart
} = require('../controllers/cartController');

router.get('/:email', getCart);

router.post('/', addToCart);

router.delete('/:index', removeFromCart);

module.exports = router;