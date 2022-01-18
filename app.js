//Express setup
const express = require('express')
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Mongoose Setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gamblingApp', {});
const db = mongoose.connection
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
    console.log("database connected")
})

//EJS Setup
const ejsMate = require('ejs-mate')
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/styles'))

//Method Override Setup
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//Model Require
const UserInfo = require('./models/userInfo');
const { userInfo } = require('os');

//Error 
const apiErrorHandler = require('./error/api-error-handler');
const APIError = require('./error/apierror');
//Requests
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/roulette/start', (req, res) => {
    res.render('roulette/start')
})

app.post('/roulette/start', async (req, res) => {
    const userInfo = new UserInfo({ name: req.body.name, highScore: 5000, game: 'Roulette' });
    await userInfo.save();
    res.render(`roulette/main`, { userInfo })
})

app.get('/50-50/start', (req, res) => {
    res.render('50-50/start')
})


app.post('/50-50/start', async (req, res) => {
    const userInfo = new UserInfo({ name: req.body.name, highScore: 5000, game: '50-50' });
    await userInfo.save();
    res.render(`50-50/main`, { userInfo })
})


app.get('/highscores', async (req, res) => {
    const allScores = await UserInfo.find();
    res.render('highscores', { allScores })
})

app.put('/highscores', async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const { id, score } = req.body
    await UserInfo.findByIdAndUpdate(id, { highScore: score });
    res.redirect('highscores')
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
})