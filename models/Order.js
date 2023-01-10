const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    items: [
        {
            type: Object
        }
    ],
    status: {
        type: String,
        required: true,
        enum: ['Placed', 'Cancelled', 'Accepted', 'Out for Delivery'],
    },
    totalPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    address: {
        type: Object
    },
    mobile: {
        type: String,
        required: true
    },
    createdMonth: Number,
    createdDate: Number,
    paymentMode: {
        type: String,
        required: true,
        enum: ['COD', 'Card']
    }
});

const Order = mongoose.model('order' , OrderSchema);
module.exports = Order;