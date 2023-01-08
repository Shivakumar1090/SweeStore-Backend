const _ = require("lodash");
const mongoose = require('mongoose');
const { User } = require('../models/user');
const { Order } = require("../models/Order");

const createOrder = async (req, res) => {
    const { userId, restaurantId, items, order_status, address, mobile, paymentMode } = req.body;
    const user = await User.findById(userId);
    if (!userId || !user) {
      return res.status(400).send({ error: "invalid user id!" });
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(400).send({ error: "invalid restaurant id!" });
    }
    let totalPrice = 0;
    for (let item of items) {
      totalPrice += item.count * item.price;
    }
    const order = new Order({
      items,
      status: order_status,
      userId: mongoose.Types.ObjectId(userId),
      restaurantId: mongoose.Types.ObjectId(restaurantId),
      totalPrice,
      address,
      mobile,
      rating: 0.0,
      createdDate: new Date().getDate(),
      createdMonth: new Date().getMonth(),
      paymentMode
    });
    await order.save();
  
    return res.status(200).send(_.pick(order, ['_id', 'items', 'status', 'paymentMode']))
  }