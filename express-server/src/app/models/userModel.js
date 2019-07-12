const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserModel = mongoose.model('User', new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: String,
    created: { type: Date, default: Date.now() }
}));

module.exports = UserModel;
