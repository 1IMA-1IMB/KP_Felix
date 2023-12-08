const express = require('express')
const router = express.Router()

router.get('', (req, res) => {

    const locals = {
        title: "NodeJS Blog",
        description: "Simple blog created with nodejs"
    }

    res.render('index', { locals });
})

router.get('/login', (req, res) => {
    res.render('login')
})


module.exports = router