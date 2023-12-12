const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.jwtSecret


const layout2 = '../views/layouts/main'

const authentication = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return
    } else {
          try {
            const decoded = jwt.verify(token, jwtSecret)
            req.userId = decoded.userId
            next()
          } catch (error){
            res.status(401).json ({ message: 'Unauthorized'})
          }
    } 

}

router.get('', async (req, res) => {

    const locals = {
        title: "NodeJS Blog",
        description: "Online News site created with nodeJS"
    }

    try {
        const data = await Users.find()
        const token = req.cookies.token
        res.render('index', { locals, data });

        if(!token) {
            return
        } else {
              try {
                const decoded = jwt.verify(token, jwtSecret)
                req.userId = decoded.userId
                next()
              } catch (error){
                res.status(401).json ({ message: 'Unauthorized'})
              }
        }
    } catch(error) {
        console.log(error)
    }



})





router.get('/login', async (req, res) => {

    
    const locals = {
        title: "NodeJS Blog",
        description: "Online News site created with nodeJS"
    }

    const token = req.cookies.token;

    try {
        if(!token){
            res.render('login', { locals, layout: layout2 })
        } else {
            res.redirect('/logout')
        }
    } catch (error) {
        
    }

})

router.post('/login', async (req, res) => {

    try {

        const { username, password } = req.body

        const user = await Users.findOne({ username })

        if(!user) {
            res.redirect('/erroric')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            res.redirect('/erroric')
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret)
        console.log(token)
        res.cookie('token', token, {httpOnly: true})

        res.render('index')

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
            const user1 = await Users.findOne({ username: username})

            if (!user1){
            const user = await Users.create({ username, password:hashedPassword})
            res.status(201).json({ message: 'User Created', user})
            } else {
                res.status(401).json ({message: 'A user with this username already exists'})
            }
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/erroric', async (req, res) => {
    const locals = {
        title: "NodeJS Blog",
        description: "Online News site created with nodeJS"
    }

    res.render('erroric', { locals, layout2 })
})

router.get('/logout', async (req, res) => {
    const locals = {
        title: "NodeJS Blog",
        description: "Online News site created with nodeJS"
    }

    const token = req.cookies.token

    const decoded = jwt.verify(token, jwtSecret)

    const users = await Users.findOne({ _id: decoded.userId})

    const username = users.username

    res.render('logout', { locals, layout2, username })
})

router.post('/logout', async (req, res) => {

    const token = req.cookies.token

    try {
        res.clearCookie('token')
        res.redirect('/')
    } catch(error) {

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