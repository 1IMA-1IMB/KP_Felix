require('dotenv').config()
const express = require('express')
const axios = require('axios')
const url = require('url')
const querystring = require('querystring')

const router = express.Router()

router.get('/', async (req, res) => {
    res.render('index')
})

router.get('/redirect', async  (req, res) => {
     const { code } = req.query

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

             console.log(output.data, userinfo.data, refresh.data)

        } else {
            res.redirect('/')
        }

         
     } else {
        res.redirect('/')
     }
    })






module.exports = router