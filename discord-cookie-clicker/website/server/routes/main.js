require('dotenv').config()
const express = require('express')
const axios = require('axios')
const url = require('url')

const router = express.Router()

router.get('/', async (req, res) => {
    res.render('index')
})

router.get('/redirect', async  (req, res) => {

    const code=req.query.code;
    const params = new URLSearchParams();
    let user;
    params.append('client_id', "1003243740799959072");
    params.append('client_secret', "RR-bl-R2YJYmRVTifAivNo5QtwG1hysy");
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', "http://localhost:8000/auth/discord");
    try{
        const response=await axios.post('https://discord.com/api/oauth2/token',params)
        const { access_token,token_type}=response.data;
        const userDataResponse=await axios.get('https://discord.com/api/users/@me',{
            headers:{
                authorization: `${token_type} ${access_token}`
            }
        })
        console.log('Data: ',userDataResponse.data)
        user={
            username:userDataResponse.data.username,
            email:userDataResponse.data.email,
            avatar:`https://cdn.discordapp.com/avatars/350284820586168321/80a993756f84e94536481f3f3c1eda16.png`

        }

        } catch(error) {
            console.log('Error', error)
            return res.send('Some error occured!')
        }
        // const { code } = req.query

        // console.log(code)

        // if (code) {
        //     const formData = new url.URLSearchParams({
        //         client_id: process.env.CLIENTID,
        //         client_secret: process.env.CLIENTSECRET,
        //         grant_type: 'authorization_code',
        //         code: code.toString(),
        //         redirect_uri: 'http://localhost:5000/redirect',
        //     })

        //     const output = await axios.post('https://discord.com/api/v10/oauth2/token',
        //         formData, {
        //             headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded',
        //             },
        //         }
        //     )

        //     if(output.data) {
        //         const access = output.data.access_token

        //         const userinfo = await axios.get('https://discord.com/api/v10/users/@me', {
        //             headers: {
        //                 'Authorization':`Bearer ${access}`
        //             }
        //         })

        //         console.log(output.data, userinfo.data)
        //     }
        // }
})

module.exports = router