const express = require("express");
const cors = require("cors");
const ConnectDB = require('./config/dbconnect');

const app = express();

require("dotenv").config();
const port = process.env.PORT || 3002;

//images
app.use(express.static("./uploads"));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//json
app.use(express.json({ extended: false }));
app.use(cors());

// Mongoose Database connection
ConnectDB();

//Routes
const UserRoute = require('./routes/user');
const ProductsRoute = require('./routes/products');
const CartRoutes = require('./routes/cart');
const OrderRoutes = require('./routes/order');

app.use('/', UserRoute);
app.use('/products',ProductsRoute);
app.use('/cart' , CartRoutes);
app.use('/order' , OrderRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
