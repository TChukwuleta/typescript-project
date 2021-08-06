import express, { Request, Response } from 'express'
import controller from '../controller/userController'
import passport from 'passport'
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();
const router = express.Router()
import ri from '../middleware/auth'
import Test from '../models/testModel';

// Index Routes
router.get('/', controller.homePage)

// Login 
router.get('/login', controller.signinGet)
router.post('/login', controller.signinPost)

// Signup
router.get('/signup', controller.signupGet)
router.post('/signup', controller.signupPost)

// Forget Password
router.get('/forgot-password', controller.forgetpassGet);
router.post('/forgot-password', controller.forgetpassPost);

router.post('/forget-password', controller.forgetttpassPost);

// Password Reset
router.post('/reset-password', controller.resetpassPost);

// Dashboard page
router.get('/dashboarded', ri.ensureAuth, (req: Request, res: Response) => {
    res.render('dashboarded.ejs')
})  

// Edit profile
router.get('/editprofile', ri.ensureAuth, controller.editprofileGet);
router.put('/editprofile', controller.editprofilePost);
 
// Edit Socials profile
router.get('/editprofilee', ri.checkAuthentication, controller.editprofileSGet);
router.put('/editprofilee', controller.editprofileSPost);

// Google login and authenticate  
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))
router.get('/auth/google/redirect', passport.authenticate('google', { 
    failureRedirect: '/' }),
 (req: Request, res: Response) => {
    res.redirect('/dashboard') 
})

// LinkedIn login and authentication
router.get('/auth/linkedin', passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile']
}))
router.get('/auth/linkedin/redirect', passport.authenticate('linkedin', { 
    failureRedirect: '/',
    successRedirect: '/dashboard'})
)

router.get('/dashboard', ri.checkAuthentication, async(req: Request, res: Response) => {
        const reqUser = req.user as { username: string, email: string }
        Test.findOne({ email: reqUser.email }, (err: any, data: any) => {
            if (data) {
                // res.json({ "data": data })
                res.render('dashboard.ejs', { user: reqUser })
            }
            else {
                const user = new Test({
                    username: reqUser.username,
                    email: reqUser.email 
                })
                user.save()
                .then((deet) => {
                    // res.json({ "deet": deet })
                    const createToken = jwt.sign({id: deet}, `${process.env.jkeys}`, {
                        expiresIn: 12 * 60 * 60
                    })
                    res.cookie('jwt', createToken, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 })
                    res.render('dashboard.ejs', { user: deet })
                })
                .catch((e) => { 
                    console.log(e) 
                })
            }
        })
})

// router.get('/dashboard', ri.checkAuthentication, (req: Request, res: Response) => {
//     res.render('dashboard.ejs', { user: req.user }) 
// }) 

// Logout User
router.get('/logout', controller.logoutUser)

export default router