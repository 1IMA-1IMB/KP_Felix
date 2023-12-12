require('dotenv').config

const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const conectdb = require('./server/config/db')

const app = express()
const port = 5000 || process.env.PORT

conectdb()

app.use(express.static('public'))

app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use('/', require('./server/routes/main'))

app.listen(port, () => {
    console.log(`Connected at http://localhost:${port}`)
})