const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String, minlength:2, maxlength:5, required: true },
    username: { type: String, unique: true, minlength:1, maxlength:20, required: true},
    password: { 
        type: String,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        },
        required: true
    },
    sex: { type: String },
    phone: { type: String },
    avatar: { type: String },
})

const User = mongoose.model('User', schema)

// User.db.dropCollection('users')

// module.exports = mongoose.model('User', schema)
module.exports = User