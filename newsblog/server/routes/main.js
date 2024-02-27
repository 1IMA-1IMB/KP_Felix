const express = require('express')
const router = express.Router()
const Users = require('../models/users')


const layout2 = '../views/layouts/main'

router.get('', async (req, res) => {

    const locals = {
        title: "NodeJS Blog",
        description: "Simple blog created with nodejs"
    }

    try {
        const data = await Users.find()
        res.render('index', { locals, data });
    } catch(error) {
        console.log(error)
    }



})





router.get('/login', async (req, res) => {

    
    const locals = {
        title: "NodeJS Blog",
        description: "Simple blog created with nodejs"
    }


    res.render('login', { locals, layout: layout2 })
})

router.post('/login', async (req, res) => {

    try {

        const { username, password } = req.body
        console.log(req.body)

        res.redirect('/')

    } catch (error) {
        console.log(error)
    }
})

// function insertUserdata () {
//     Users.insertMany([
//         {
//             username: "felix2",
//             password: "1234523"
//         }
//     ])
// }

// insertUserdata()
 


module.exports = router