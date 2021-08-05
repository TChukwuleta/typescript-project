import express, { Request, Response } from 'express'
import controller from '../controller/userController'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import Test from '../models/testModel'
const router = express.Router()
import ri from '../middleware/auth'

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

router.get('/dashboard', ri.checkAuthentication, (req: Request, res: Response) => {
    res.render('dashboard.ejs', { user: req.user }) 
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

// router.get('/auth/google/redirect', passport.authenticate('google', { 
//     failureRedirect: '/' }),
//  (req: Request, res: Response) => {
//     res.redirect('/dashboard') 
// })

router.get('/auth/google/redirect', passport.authenticate('google', { 
    failureRedirect: '/' }), controller.signupSTest)
//  (req: Request, res: Response) => {
//     res.redirect('/dash') 
// }) 

// router.get('/dash', ri.checkAuthentication, controller.signupSTest)
// router.get('/dash', ri.checkAuthentication, (req: Request, res: Response) => {
//     // res.send(req.body)
//     // try {
//     //     const user = await Test.create({
//     //         username: req.user.username
//     //     })
//     // }
// })

// const signupSTest = async (req: Request, res: Response) => { 
//     try {
//         const user = await Test.create({
//             username: req.body.user.username,
//             email: req.body.user.email
//         })
//         console.log(req.body.user)
//         const token = createToken(user._id)
//         res.cookie('jwt', token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 }) 
//         res.render('dashboard.ejs', { user: req.body.user }) 
//         res.status(201).json({user: user._id })
//     }
//     catch (e) {
//         const errorsss = handleErrors(e)
//         res.status(400).json({ errorsss })
//     }
// }

 
// LinkedIn login and authentication
router.get('/auth/linkedin', passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile']
}))

router.get('/auth/linkedin/redirect', passport.authenticate('linkedin', { 
    failureRedirect: '/',
    successRedirect: '/dashboard'})
)

// Logout User
router.get('/logout', controller.logoutUser)

export default router