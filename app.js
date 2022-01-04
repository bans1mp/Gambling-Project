const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const db = mongoose.connection

db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
    console.log("database connected")
})

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.render('home');
})


app.get('/roulette/main', (req, res) => {

    res.render('roulette/main');
})

app.get('/50-50/main', (req, res) => {
    res.render('50-50/main')
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})