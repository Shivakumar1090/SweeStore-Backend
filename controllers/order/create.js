const _ = require("lodash");
const mongoose = require('mongoose');
const User  = require('../../models/User');
const Order = require("../../models/Order");

const CreateOrder = async (req, res) => {
  const { userId, items, order_status, address, mobile, paymentMode } = req.body;
  const user = await User.findById(userId);
  if (!userId || !user) {
    return res.status(400).send({ error: "invalid user id!" });
  }
  
  let totalPrice = 0;
  for (let item of items) {
    totalPrice += item.count * item.price;
  }

  const order = new Order({
    items,
    status: order_status,
    userId: mongoose.Types.ObjectId(userId),
    totalPrice,
    address,
    mobile,
    createdDate: new Date().getDate(),
    createdMonth: new Date().getMonth(),
    paymentMode
  });

  await order.save();
  await user.clearCart();
  return res.status(200).send(_.pick(order, ['_id', 'items', 'status', 'paymentMode']))
}

module.exports = CreateOrder;