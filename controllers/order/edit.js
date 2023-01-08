const _ = require("lodash");
const mongoose = require('mongoose');
const { User } = require('../models/user');
const { Order } = require("../models/Order");

const editOrder = async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (req.body.rating) {
      const restaurant = await Restaurant.findById(order.restaurantId);
      const currentRating = order.rating;
      const newRating = req.body.rating;
  
      const sum = restaurant.rating * restaurant.ratingsCount +
        (currentRating > 0 ? newRating - currentRating : newRating);
      const total = restaurant.ratingsCount + (currentRating == 0 ? 1 : 0);
      const avg = sum / total;
  
      restaurant.rating = avg;
      restaurant.ratingsCount = total;
      await restaurant.save();
    }
    Order.findByIdAndUpdate(orderId, req.body, { new: true }, (err, order) => {
      if (err) {
        return res.status(500).send({ error: "Error while Updating the order, try again!" })
      };
      res.status(200).send("order updated!");
    })
  }