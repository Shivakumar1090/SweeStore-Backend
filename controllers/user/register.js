const Joi = require('joi');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

const validation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email : Joi.string().max(100).required().email(),
    password: Joi.string().min(6).max(100).required(),
})

const Register = async(req,res) => {
    const {
        error ,
        value: {email,password,name}
    } = validation.validate(req.body);

    try{
        if (error) return res.status(422).send({ Message: error.message })
        const {name,email,password} = req.body;

        User.findOne({email: email})
            .then(async(savedUser) => {
                if(savedUser)
                    return res.status(422).send({Message: "Email is already present"});
                
                bcrypt.hash(password,12)
                    .then(async (hashedPassword) => {
                        const newuser = new User({
                            name,
                            email,
                            password: hashedPassword,
                            isAdmin: false,
                        });

                        await newuser.save();

                        return res.status(200).send({Message: "Registered Successfully"});
                    })
                    .catch(err => {
                        console.log("Password is not hashed");
                        res.status(422).send({ Message: "Internal server error" });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ Message: "Internal server error" });
            });
    }catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

module.exports = Register;