const Product = require('../../models/Product');
const User = require('../../models/User');

const updateCart = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id).exec();

        if (!user) {
            return res.status(400).send({ Message: "invalid user!" });
        }
        const { type, itemId } = req.body;
        const item = await Product.findById(itemId);
    
        if (!item) {
            return res.status(400).send({ Message: "invalid item id!" });
        }
        if (type === 'ADD_ITEM') {
            await user.addItem(itemId);
        } else if (type === 'REMOVE_ITEM') {
            await user.removeItem(itemId);
        } else if (type === 'DELETE_ITEM') {
            await user.deleteItem(itemId);
        }
        else {
            return res.status(400).send(`unknown operation type: ${type}`)
        }
        res.status(200).send({Message: "cart updated succesfully!"})

    } catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

module.exports = updateCart;