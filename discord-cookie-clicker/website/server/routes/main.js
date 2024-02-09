require('dotenv').config()
const express = require('express')
const axios = require('axios')
const url = require('url')
const querystring = require('querystring')

const router = express.Router()


// Schemas 

const Users = require('../schemas/users')

// Schemas end

// Usefull Functions

const user = async (x) => {
    const user = await Users.findOne({ refreshToken: x})

    if(!user) {
        return false    
    } else {
        return true
    }
}


// Usefull functions end

router.get('/', async (req, res) => {

    const token = req.cookies.token

    user(token)

    if(!user) {
        res.render('index')
    } else if (user) {
        const user = await Users.findOne({ refreshToken: token })

        res.render('index', { user })
    }
})

router.get('/redirect', async  (req, res) => {
     const { code } = req.query

     try {
        if (code) {
            const postData = querystring.stringify({
                client_id: process.env.CLIENTID,
                client_secret: process.env.CLIENTSECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://localhost:5000/redirect/'
             })
             
            const output = await axios.post('https://discord.com/api/oauth2/token', postData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
             })
    
            if (output.data) {
                const access = output.data.access_token;
    
                const userinfo = await axios.get('https://discord.com/api/users/@me', {
                    headers: {
                        'Authorization': `Bearer ${access}`
                    },
                })
    
                const postData1 = querystring.stringify({
                    client_id: process.env.CLIENTID,
                    client_secret: process.env.CLIENTSECRET,
                    grant_type: 'refresh_token',
                    redirect_uri: 'http://localhost:5000/redirect/',
                    refresh_token: output.data.refresh_token
                 })
        
        
            
                const refresh = await axios.post('https://discord.com/api/oauth2/token', postData1, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                 })
    
                const generateURL = (x, y) => {
                    return `https://cdn.discordapp.com/avatars/${x}/${y}.png`
                }
    
                const userId = userinfo.data.id
                const avatarId = userinfo.data.avatar
                const userName = userinfo.data.username
                const refreshToken = output.data.refresh_token
                const accessToken = output.data.access_token
    
                 
                const avatarUrl = generateURL(userId, avatarId)
    
    
                const user = await Users.findOne({ userId: userId })
    
                const token = req.cookies.token
    
    
                if(!user) {         
                
                await Users.create({
                    userId: userId,
                    userName: userName,
                    avatarURL: avatarUrl,
                    refreshToken: refreshToken,
                    token: accessToken
                })
    
                if(!token) {
                    res.cookie('token', refreshToken, { httpOnly: true })
                    res.redirect('/')
                } else {
                    res.clearCookie('token')
                    res.cookie('token', refreshToken, { httpOnly: true })
                    res.redirect('/')
                }
    
    
                } else {


                    user.userId = userId
                    user.userName = userName
                    user.avatarURL = avatarUrl
                    user.refreshToken = refreshToken
                    user.token = accessToken
    
    
                    await user.save()
                    
                    if(!token) {
                        res.cookie('token', refreshToken, { httpOnly: true })
                        res.redirect('/dashboard')
                    } else {
                        res.clearCookie('token')
                        res.cookie('token', refreshToken, { httpOnly: true })
                        res.redirect('/dashboard')
                    }
                    
                }
    
    
    
            } else {
                res.redirect('/')
            }
    
             
         } else {
            res.redirect('/')
         }
     } catch (error) {
        console.log(error)
     }
})

router.get('/dashboard', async (req, res) => {
    const token = req.cookies.token

    if(!token) {
        res.redirect('https://discord.com/api/oauth2/authorize?client_id=1204331115679318056&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fredirect%2F&scope=identify+connections+guilds.join+gdm.join+guilds+email')
    } else {

        const user = await Users.findOne({ refreshToken: token })

        if (!user) {
            res.clearCookie('token')
            res.redirect('/')
        } else {
            res.render('dashboard', { user })
        }
    }
})


module.exports = router