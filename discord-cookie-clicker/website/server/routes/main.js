require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const { request } = require('undici');

const port = 5000

const clientId = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET

const router = express.Router()

router.get('/', async  (req, res, request) => {

    const  { code }  = req.query

	if (code) {
		try {
			const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${port}`,
					scope: 'identify',
				}).toString(),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});


            const oauthData = await tokenResponseData.body.json()
			console.log(oauthData);
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error
			// tokenResponseData.statusCode will be 401
			console.error(error);
		}
	}

    res.render('index')
})

module.exports = router