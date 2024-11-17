

// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('products.product');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;