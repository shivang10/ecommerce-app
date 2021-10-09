const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true},
    orders: {type: Array, required: false, default: []},
    address: {type: Array, required: false, default: []}
}, {
    collection: 'users'
})

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model
