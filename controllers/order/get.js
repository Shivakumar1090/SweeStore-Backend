const _ = require("lodash");
const mongoose = require('mongoose');
const { User } = require('../models/user');
const { Order } = require("../models/Order");

const getOrders = async (req, res) => {
    const { type, id } = req.body;
    if (type != 'USER' && type != 'RESTAURANT') {
      return res.status(400).send({ error: "invalid user type!" });
    }
    let user, orders;
    if (type == 'USER') {
      user = await User.findById(id);
      orders = await Order.find({ userId: id });
    } else {
      user = await Restaurant.findById(id);
      orders = await Order.find({ restaurantId: id });
    }
    if (req.body.status) {
      orders = orders.filter((order) => order.status == req.body.status);
    }
  
    if (!user) {
      return res.status(400).send({ error: "user doesn't exist!" });
    }
    const response = await Promise.all(orders.map(async (order) => {
      await order.populate('userId');
      await order.populate('restaurantId');
      return {
        ..._.pick(order, [
          '_id',
          'items',
          'userId._id',
          'userId.name',
          'restaurantId._id',
          'restaurantId.name',
          'restaurantId.address',
          'status',
          'address',
          'mobile',
          'rating',
          'paymentMode'
        ]), createdAt: order._id.getTimestamp()
      };
    }))
    return res.status(200).send(response)
  }