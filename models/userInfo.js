const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
    name: String,
    game: String,
    highScore: Number
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);