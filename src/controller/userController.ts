import { NextFunction, Request, Response } from 'express'
import User from '../models/userModel'
import bcrypt from 'bcryptjs'
const keys = require('../keys')
import jwt from 'jsonwebtoken'

// Handle errors
const handleErrors = (err: any) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '', username: '' }

    // Incorrect email 
    if (err.message === 'Incorrect email') {
        errors.email = 'This email is not registered'
    }
    
    // Incorrect Password
    if (err.message === 'Incorrect password') {
        errors.password = 'The password entered is incorrect'
    }

    // Duplicate error code
    if (err.code === 11000) {
        errors.email = 'This email is already registered'
        return errors 
    }

    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach((error:any) => {
            const key = error.properties.path as string
            if (key === 'email' || key === 'password' || key === 'username') {
                errors[key] = error.properties.message
            }
        })
    }
    return errors
}

// Token
const createToken = (id: string) => {
    return jwt.sign({id}, keys.session.key, {
        expiresIn: 12 * 60 * 60
    })
}

// Index Route controller
const homePage = (req: Request, res: Response) => {
    res.render('home.ejs') 
}

// Sign up GET controller
const signupGet = (req: Request, res: Response) => {
    res.render('index.ejs')
}

// Sign up POST controller
const signupPost = async (req: Request, res: Response) => { 
    const { email, password, username } = req.body
    try {
        const user = await User.create({ username, email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 }) 
        res.status(201).json({user: user._id })
    }
    catch (e) {
        const errorsss = handleErrors(e)
        res.status(400).json({ errorsss })
    }
}

// Sign In GET controller  
const signinGet = (req: Request, res: Response) => {
    res.render('login.ejs')
}

// Sign in POST controller
const signinPost = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({ user: user.id })
    }
    catch (e) {
        const errorsss = handleErrors(e)
        res.status(400).json({errorsss})
    }
}

// Logout user
const logoutUser = (req: Request, res: Response) => {
    res.cookie('jwt', '', { maxAge: 1 })
    req.logout()
    res.redirect('/')
    // req.logout()
    // res.redirect('/')
}

// Forget Password
const forgetpassGet = (req: Request, res: Response, next: NextFunction) => {
    res.render('forgotpass.ejs')
}

const forgetpassPost = (req: Request, res: Response, next: NextFunction) => {
    const { email, npassword, cnpassword } = req.body
    console.log(req.body);
    User.findOne({ email }, (err: any, data: any) => {
        console.log(data)
        if (!data) {
            console.log('Not registered email')
            res.send({ "Success": "This email is not registered" })
        }
        else {
            if (npassword != cnpassword) {
                console.log('Password doesnt match')
                res.send({ "Success": "Password doesnt match! Both password must match" })
            }
            else {
                data.password = npassword
                data.save((err: any, Person: any) => {
                    if (err) {
                        handleErrors(err)
                    }
                    else {
                        console.log('Password Changed')
                        res.send('Password Changed')
                    }
                })
            }
        }

    })
}

// Edit profile GET method
const editprofileGet = (req: Request, res: Response, next: NextFunction) => {
    res.render('editprofile.ejs')
} 

// Edit profile POST method
const editprofilePost = async (req: Request, res: Response, next: NextFunction) => {
    // const { username, password } = req.body
    try {
        const user = await User.updateOne({ email: req.body.email}, {$set: {
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10)
        }},{new: true})
        console.log(user)
        res.send(user)
    }
    catch(e) {
        console.log(e)
        res.send(e)
    }
}

export default {
    homePage,
    signupGet,
    signupPost,
    signinGet,
    signinPost, 
    forgetpassPost,
    logoutUser,
    forgetpassGet,
    editprofileGet,
    editprofilePost
}
