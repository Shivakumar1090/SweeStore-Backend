const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');

const User = require('../../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

const validation = joi.object({
    email : joi.string().min(10).max(100).required().email(),
    password: joi.string().min(6).max(100).required(),
})

const Login = async(req,res) => {
    const {
        error ,
        value: {email,password}
    } = validation.validate(req.body);
    
    try{
        if (error) return res.status(301).send({ Message: error.message });

        const {email,password} = req.body;
        const savedUser = await User.findOne({email: email});

        if(savedUser && bcrypt.compareSync(password,savedUser.password)){
            let token = jwt.sign({_id: user._id} , JWT_SECRET);
            const {name,email,_id} = savedUser;
            const data = {token,name,email,_id};
            res.status(200).json({data , Message: 'Successfully logged in!'})
        } else{
            res.status(404).send({ Message: "Invalid  Credentials." });
        }
    }catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

module.exports = Login;