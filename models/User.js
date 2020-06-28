const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const config = require('config'); 

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true
    }, 
    email: {
        type: String, 
        require: true
    }, 
    password: {
        type: String, 
        require: true
    }, 
    date: {
        type: Date, 
        default: Date.now()
    }
}); 

UserSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    }
}); 


module.exports = mongoose.model('user', UserSchema); 