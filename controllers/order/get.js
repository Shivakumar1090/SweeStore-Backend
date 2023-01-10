const _ = require("lodash");
const User = require('../../models/User');
const Order = require('../../models/Order');

const getOrders = async (req, res) => {
  const { id } = req.body;

  if(!id){
    let data = await Order.find();
    return res.send(data);
  }
  
  let user, orders;

  user = await User.findById(id);
  orders = await Order.find({ userId: id });

  if (req.body.status) {
    orders = orders.filter((order) => order.status == req.body.status);
  }

  if (!user) {
    return res.status(400).send({ error: "user doesn't exist!" });
  }

  const response = await Promise.all(orders.map(async (order) => {
    await order.populate('userId');
    return {
      ..._.pick(order, [
        '_id',
        'items',
        'userId._id',
        'userId.name',
        'status',
        'address',
        'mobile',
        'paymentMode'
      ]), createdAt: order._id.getTimestamp()
    };
  }))
  return res.status(200).send(response)
}

module.exports = getOrders;