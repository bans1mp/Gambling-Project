const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
    name: String,
    email: String,
    balance: Number
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);