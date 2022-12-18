const Product = require('../../models/Product');
const deLinkFile = require("../../utility/deLinkFile");

const Edit_Product = async (req,res) => {
    console.log("edit");
    try{
        const {id} = req.params;
        
        if(req.file){
            req.body.img = 'products/'+req.file.filename;
        }

        let changingProduct = await Product.findById(id).exec();

        await Product.findByIdAndUpdate(id,req.body);

        if(req.file && changingProduct.img)
            deLinkFile("uploads/" + changingProduct.img);
        
        res.json({Message: "success"});
    } catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

module.exports = Edit_Product;