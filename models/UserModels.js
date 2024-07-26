const mongoose = require('mongoose')


const userSchema = mongoose.Schema({

    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
    },
  
    Email: {
        type: String,
        required: true
    },
    Phonenumber: {
        type: String,
        required: true
    },
    Role: {
        type: Number,
        required: true,
        default: 1,
    },
    password: {
        type: String,
        required: true
    },
});

const users = mongoose.model('users', userSchema)
module.exports = users