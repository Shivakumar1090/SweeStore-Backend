const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    address: {
        houseNo: String,
        street: String,
        city: String,
        zip: String,
        lat: Number,
        long: Number
    },
    cart: {
        items: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                },
                quantity: { type: Number, required: true }
            }
        ],
    },
});

userSchema.methods.addItem = function (id) {
    const updatedItems = [...this.cart.items];
    const itemIndex = updatedItems.findIndex((item) => {
        return id.toString() === item.id.toString();
    })
    if (itemIndex >= 0) updatedItems[itemIndex].quantity += 1;
    else updatedItems.push({ id, quantity: 1 })

    this.cart.items = updatedItems;
    return this.save();
};

userSchema.methods.removeItem = function (id) {
    let updatedItems = [...this.cart.items];
    const itemIndex = updatedItems.findIndex((item) => {
        return id.toString() === item.id.toString();
    })
    if (itemIndex >= 0) {
        updatedItems[itemIndex].quantity -= 1;
        if (updatedItems[itemIndex].quantity === 0) updatedItems = updatedItems.filter((item) => item.id.toString() !== id);
    }
    this.cart.items = updatedItems;
    return this.save();
};

userSchema.methods.deleteItem = function (id) {
    let updatedItems = [...this.cart.items];
    updatedItems = updatedItems.filter((item) => item.id.toString() !== id);
    this.cart.items = updatedItems;
    return this.save();
}

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
};

const User = mongoose.model("user", userSchema);
module.exports = User;

