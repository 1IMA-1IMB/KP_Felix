const express = require('express')
const app = express()

app.use(express.static("frontend"))

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    console.log('Finished Setup')
    res.render('index')
})

const userRouter = require('./routes/users')

app.use('/users', userRouter)

console.log('server running')

app.listen(3000)