const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId:{
        type: String,
        trim: true
    },
    username:{
        type: String,
        trim: true,
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'A valid email address is required']
    },
    characters:{
        type: Array,
        default:[]
    }
})

module.exports = mongoose.model('users', userSchema);