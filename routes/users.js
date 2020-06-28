const express = require('express'); 

const router = express.Router(); 

const { check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken'); 

const config = require('config'); 

const User = require('../models/User');
const connectDB = require('../config/db');

router.get('/', async (req, res) => {
    res.send('User route!'); 
})

router.post('/', [
    check('name', 'Name is required').notEmpty(), 
    check('email', 'Incorect email').isEmail(), 
    check('password', 'Password must be 6 characters length').isLength({min : 6})
] ,async (req, res) => {
    const erros = validationResult(req); 

    if(!erros.isEmpty) {
        return res.status(400).json({error: erros.array()}); 
    }

    const {name, email, password} = req.body;
    

    try {
        let user = await User.findOne({email}); 

        if(user) {
            return res.status(400).json({message: 'User has already existed!'}); 
        }

        user = new User({name,email, password});
        
        await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('secretToken'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }); 

    } catch (error) {
        console.error(error.message); 
        res.status(500).json({message: 'Server error!'}); 
    }

}); 

module.exports = router; 