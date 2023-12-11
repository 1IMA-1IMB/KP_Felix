const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.jwtSecret


const layout2 = '../views/layouts/main'

    const locals = {
        title: "NodeJS Blog",
        description: "Online News site created with nodeJS"
    }

    try {
    
    const locals = {
        title: "NodeJS Blog",
        description: "Online News site created with nodeJS"
    }


    try {

        const { username, password } = req.body
        console.log(req.body)

        res.redirect('/')
        const user = await Users.findOne({ username })

        if(!user) {
            return res.status(401).json({ message: 'Invalid Credentials'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Credentials'})
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret)
        res.cookie('token', token, {httpOnly: true})

        res.send('Logged in')

    } catch (error) {
        console.log(error)
    }


})

// router.post('/login', async (req, res) => {

// })

router.get('/register', async (req, res) => {
    const locals = {
        title: "NodeJS Blog",
        description: "Online News site created with nodeJS"
    }

    res.render('register', { locals, layout: layout2})
})

router.post('/register', async (req, res) => {
    try {

        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        try {
            const user = await Users.create({ username, password:hashedPassword})
            res.status(201).json({ message: 'User Created', user})
        } catch (error) {
            console.log(error)
        }

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
