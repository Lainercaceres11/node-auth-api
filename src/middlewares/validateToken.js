import { request, response } from "express"
import jwt from "jsonwebtoken"

export const authRequirer = (req = request, res = response, next)=>{
    const {token} = req.cookies
    if(!token) return res.status(401).json({message: "Unauthorized"})

    jwt.verify(token, "secret1234", (error, user)=>{
        if(error) return res.status(402).json({message: "No token"})
        req.user = user
    })

    next()
}