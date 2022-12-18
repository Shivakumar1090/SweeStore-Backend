const Product = require('../../models/Product');

const Add_Product = async(req,res) => {
    try{
        const {name,desc,grams,price} = req.body;

        const newProduct = new Product({
            name,
            desc,
            grams,
            price,
            img: "products/"+req.file.filename,
        });

        await newProduct.save();
        res.json({Message: "success"});
    } catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

module.exports = Add_Product;