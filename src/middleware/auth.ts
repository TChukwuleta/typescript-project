import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'
const keys = require('../../keys')

const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    // Check that JSON web token exists and is verified
    if (token) {
        jwt.verify(token, keys.session.key, (err: any, decodedToken: any) => {
            if (err) {
                console.log(err.message)
                res.redirect('/')
            }
            else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        res.redirect('/')
    }
}

// Check current user
const checkUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, 'MyGodIsGood', async (err: any, decodedToken: any) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            }
            else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }
    else {
        res.locals.user = null
        next()
    }
}

export default {
    ensureAuth,
    checkUser
}