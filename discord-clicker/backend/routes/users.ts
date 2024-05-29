import express, { Router, Request, Response } from "express";
import Users from "../models/Users";
import jwt from 'jsonwebtoken'

const router: Router = express.Router()

router.post("/", async (req: Request, res: Response) => {
    try {
        const token = req.body.token

    
        if(!token) return res.status(500).json({ message: 'Invalid token.'})

    
        const userToken: any = jwt.verify(token, process.env.jwtSecret as string )


    
        const user = await Users.findOne({ token: userToken.token }) 
    
        if(!user) return res.status(500).json({ message: 'Invalid token.'})
    
        
    
        res.json({ message: 'User found.', user: user })
    } catch(error) {
        console.log(error)
    }
})

export default router;