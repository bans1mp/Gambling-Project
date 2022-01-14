const mongoose = require('mongoose');

const UserInfo = require('../models/userInfo');

mongoose.connect('mongodb://localhost:27017/gamblingApp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const clearDB = async () => {
    await UserInfo.deleteMany({});
}

clearDB()