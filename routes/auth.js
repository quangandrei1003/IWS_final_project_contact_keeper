const express = require('express');
const router = express.Router();

const cors = require('cors'); 

router.use(cors()); 

const User = require('../models/User');

const auth = require('../middleware/auth'); 

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});


router.post('/', [
    check('email', 'Please enter a valid email!!').isEmail(),
    check('password', 'Password is required!!').exists()
], async (req, res) => {
    // res.send('Auth Route');
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('secretToken'),
            {
              expiresIn: 360000,
            },
            (err, token) => {
              if (err) throw err;
              res.json({token});
            },);

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: 'Server error' });
    }
})

module.exports = router; 