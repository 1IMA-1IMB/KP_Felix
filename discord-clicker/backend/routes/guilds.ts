import express, { Router, Request, Response} from 'express'
import axios from 'axios'
// import Users from '../models/Users'
import jwt from 'jsonwebtoken'


// const clientId: string = process.env.clientId as string

// const clientSecret: string = process.env.clientSecret as string

const jwtSecret: string = process.env.jwtSecret as string

const router: Router = express.Router()

router.post('/owned', async (req: Request, res: Response) => {

    try {

        const token: string = req.body.token  as string

        console.log('Got here')

        if(!token) return res.status(500).json({ message: 'Invalid token.'})

        
        const access: any = jwt.verify(token, jwtSecret)

        const access_token = access.token
    
        const guildsinfo = await axios.get('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })  


        if(guildsinfo.data) {
        
            const ownedGuilds = guildsinfo.data.filter((guild: any) => guild.owner === true)
    
            res.json({ message: 'Guilds found.', guilds: ownedGuilds })
        } else {
            res.status(500).send('No guilds found')
        }

    } catch(error: Error | unknown) {
        console.log(error)
    }
})


export default router