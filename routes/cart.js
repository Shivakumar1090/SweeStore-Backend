const express = require("express");
const router = express.Router();

const GetCart = require('../controllers/cart/get');
const updateCart = require('../controllers/cart/update');

router.get('/:id' , GetCart);
router.post('/update/:id' , updateCart);

module.exports = router;
