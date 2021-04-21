const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv');
const { body, validationResult } = require('express-validator');
//const Joi = require('@hapi/joi');


// const Schema = {
//     username: Joi.string().min(6).max(255).required(),
//     email: Joi.string().min(6).max(255).required().email(),
//     password: Joi.string().min(6).max(1024).required()
// }

// inserting data
router.post('/register',
        body('username').isLength({ min: 5}),
        body('email').isEmail( ),
        body('password').isLength({ min: 5 }),
        async (req , res )=>{ 
            const errors = validationResult(req);
            if (errors) {
              return res.status(400).json({ errors: errors.array() });
            }   
        const registerUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const saveUser = await registerUser.save();
        res.json(saveUser);
    }catch(err){
        res.json({message: err });
    }
    
});


// Login user
router.post('/login',async (req, res)=>{     
    //if email not exist or not matched
    const emailExist = await User.findOne({ email: req.body.email});
    if (!emailExist) return res.status(400).send('Email or password is wrong, please enter correct credentials');
    
    // creating jwt token
    const token = jwt.sign({_id: emailExist._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);



    //res.json(emailExist);
    
});

// Login user
router.post('/nlp',async (req, res)=>{     
    //human language processing start

    let sentense = 'Good colleges in London. good colleges in Lahore'.split('.');
    let words = [];
    // console.log(sentense);
    sentense.forEach((element, index) =>{
      console.log(element);
      // console.log(index);
      words[index] = element.split(' ');
    });
    console.log(words);
    this.matches = '';

    //human language processing end
    
    //res.json(emailExist);
    
});

// const a = Joi.validate(req.body, Schema);
// res.send(validation);















module.exports = router;