const Product = require('../../models/Product');

const Get_Products = async (req,res) => {
    try{
        let data = await Product.find();
        res.send(data);
        // console.log(data);
    }catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

module.exports = Get_Products;