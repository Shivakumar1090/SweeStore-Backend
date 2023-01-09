const express = require("express");
const router = express.Router();

const CreateOrder = require('../controllers/order/create');
const editOrder = require("../controllers/order/edit");
const getOrders = require("../controllers/order/get");

router.post('/create' , CreateOrder);
router.post('/edit/:id' , editOrder);
router.post('/get' , getOrders);

module.exports = router;