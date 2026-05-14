const express = require('express');

const router = express.Router();

const {
    createOrder,
    getOrders,
    getAllOrders
} = require('../controllers/orderController');

router.post('/', createOrder);

router.get('/:email', getOrders);

router.get('/', getAllOrders);

module.exports = router;