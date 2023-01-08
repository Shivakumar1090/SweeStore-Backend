const _ = require("lodash");
const User = require('../../models/User');

const GetCart = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).send({ error: "invalid user id!" });
        }
        await user.populate('cart.items.id');
        const items = user.cart.items;
        let totalPrice = 0;
        for (let item of items) {
            totalPrice += item.quantity * item.id.price;
        }
        let response = [];
        items.forEach((item) => {
            response.push(_.pick(item, ['id._id', 'id.name', 'id.grams', 'id.price', 'quantity']))
        })
        return res.status(200).send({ response, totalPrice })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

module.exports = GetCart;