const Product = require('../../models/Product');
const deLinkFile = require("../../utility/deLinkFile");

const Delete_Product = async(req,res) => {
    try{
        const {id} = req.params;
        let deletingProduct = await Product.findById(id).exec();

        await Product.findByIdAndDelete(id);
        
        if(deletingProduct.img)
            deLinkFile("uploads/"+deletingProduct.img);

        res.json({Message: "success"});
    } catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}   

module.exports = Delete_Product;