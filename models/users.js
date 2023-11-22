const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    githubId:{
        type: String,
        trim: true
    },
    username:{
        type: String,
        trim: true,
        required: [true, 'Username is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'A valid email address is required']
    },
    tasksAssigned: [String]
})

module.exports = mongoose.model('users', userSchema);