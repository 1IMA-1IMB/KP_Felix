import axios from 'axios';
import express, { Router, Request, Response } from 'express';
import dotenv from 'dotenv'
import Users from '../models/Users'
import jwt from 'jsonwebtoken'

dotenv.config()

const jwtSecret: string = process.env.jwtSecret as string

const clientId: string = process.env.clientId as string

const clientSecret: string = process.env.clientSecret as string

const router: Router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.send('Register Route')
})

router.post("/", async (req: Request, res: Response) => {
    try {


    const code: string = req.body.code as string

    const formData = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:5173/discord/oauth/authenticate/'
    })

    const output = await axios.post('https://discord.com/api/oauth2/token',
        formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )

    if(output.data){
        const access = output.data.access_token;

        const userinfo = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${access}`
            }
        })

        console.log(output.data, userinfo.data)

        if(userinfo.data){
            const user: any = await Users.findOne({ id: userinfo.data.id })

            if(!user) {
                Users.create({
                    id: userinfo.data.id,
                    username: userinfo.data.username,
                    refresh_token: output.data.refresh_token
                })

                const token = jwt.sign({ refreshToken: output.data.refresh_token}, jwtSecret)


                res.json({ token: token})


            } else {

                const oldtoken = user.refresh_token

                

                user.old_tokens.push(oldtoken)

                user.refresh_token = output.data.refresh_token

                await user.save()

                const token = jwt.sign({ refreshToken: output.data.refresh_token}, jwtSecret)


                res.json({ token: token})
            }
        }
    }

    } catch (error: Error | any) {
        console.log(error)
    }
})


export default router