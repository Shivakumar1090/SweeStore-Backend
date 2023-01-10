const _ = require("lodash");
const Order = require('../../models/Order');

const editOrder = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);
  Order.findByIdAndUpdate(id, req.body, { new: true }, (err, order) => {
    if (err) {
      return res.status(500).send({ error: "Error while Updating the order, try again!" })
    };
    res.status(200).send("order updated!");
  })
}

module.exports = editOrder;