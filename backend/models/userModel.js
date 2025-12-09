const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please add a username'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters']
    }
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);