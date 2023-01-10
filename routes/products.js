const express = require("express");
const router = express.Router();

const userMiddleware = require('../middlewares/user');
const adminMiddleware = require('../middlewares/admin');

const { upload, storageEngine } = require("../utility/upload");
const outputFolder = './uploads/products';

const Get_Products = require('../controllers/products/get');
const Add_Product = require('../controllers/products/add');
const Edit_Product = require('../controllers/products/edit');
const Delete_Product = require('../controllers/products/delete');

const uploadTag =  upload(storageEngine(outputFolder)).single("img");

router.get("/" , Get_Products);
router.post("/add" ,uploadTag , Add_Product);
router.put("/edit/:id" , uploadTag , Edit_Product);
router.delete('/delete/:id', Delete_Product);

module.exports = router;