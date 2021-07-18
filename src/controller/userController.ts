import { NextFunction, Request, Response } from 'express'
import User from '../models/userModel'
const keys = require('../../keys')
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
        expiresIn: 24 * 60 * 60
    })
}


const homePage = (req: Request, res: Response) => { 
    res.send('Hi')
}

const signupGet = (req: Request, res: Response) => {}

// Sign up POST controller
const signupPost = async (req: Request, res: Response) => {
    const { email, password, username } = req.body
    try {
        const user = await User.create({ username, email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        // res.status(201).json({user: user._id })
    }
    catch (e) {
        const errorsss = handleErrors(e)
        res.status(400).json({ errorsss })
    }
}

const signinGet = (req: Request, res: Response) => {}

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
    res.redirect('/')
}

const forgetPass = (req: Request, res: Response, next: NextFunction) => {
        //console.log('req.body');
        //console.log(req.body);
        // User.findOne({email:req.body.email},function(err,data){
        //     console.log(data);
        //     if(!data){
        //         res.send({"Success":"This Email Is not regestered!"});
        //     }else{
        //         // res.send({"Success":"Success!"});
        //         if (req.body.password==req.body.passwordConf) {
        //         data.password=req.body.password;
        //         data.passwordConf=req.body.passwordConf;
    
        //         data.save(function(err, Person){
        //             if(err)
        //                 console.log(err);
        //             else
        //                 console.log('Success');
        //                 res.send({"Success":"Password changed!"});
        //         });
        //     }else{
        //         res.send({"Success":"Password does not matched! Both Password should be same."});
        //     }
        //     }
        // });
}

export default {
    homePage,
    signupGet,
    signupPost,
    signinGet,
    signinPost,
    forgetPass,
    logoutUser
}
