require('dotenv').config();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')

const express = require('express');
const expressLayout = require('express-ejs-layouts')

const connectDB = require('./server/config/db');
const session = require('express-session');

const app = express();
const PORT = 5000 || process.env.PORT;

connectDB();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODBURL
    })
}))

app.use(express.static('public'))

app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use('/', require('./server/routes/main'))

app.listen(PORT, ()=> {
    console.log(`App listening on port http://localhost:${PORT}`)
})