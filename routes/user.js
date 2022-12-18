const express = require('express');
const router = express.Router();

const Register = require('../controllers/user/register');
const Login = require('../controllers/user/login');
const User = require('../models/User');

router.get('/users' , (req,res) => {
    console.log("gi");
    User.find()
        .then(data => res.send(data))
        .catch(err => res.send(err));
})

router.post('/login' , Login);
router.post('/register' , Register);

module.exports = router;