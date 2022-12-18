const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    img:  {
        type: String, 
        default: null,
    },
    grams: {
        type: String,
    },
    price: {
        type: String,
    },
});

const Product = mongoose.model("product" ,ProductSchema);
module.exports = Product;