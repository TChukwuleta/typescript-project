import express, { Request, Response } from 'express'
import controller from '../controller/userController'
import passport from 'passport'
const router = express.Router()
import ri from '../middleware/auth'

// router.get('*', ri.ensureAuth)

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

// Dashboard page
// router.get('/dashboard', (req: Request, res: Response) => {
//     res.render('profile.ejs', { user: req.user })
// })

router.get('/dashboarded', ri.ensureAuth, (req: Request, res: Response) => {
    res.render('dashboard.ejs')
})

router.get('/dashboard', (req: Request, res: Response) => {
    res.render('dashboard.ejs', { user: req.user })
})

// Profile page
router.get('/profile', (req: Request, res: Response) => {
    res.render('profile.ejs', { user: req.user })
})

// Edit profile
router.get('/editprofile', controller.editprofileGet);

router.put('/editprofile', controller.editprofilePost);

router.post('/forgot-password', controller.forgetpassPost);

// Google login and authenticate  
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/' }),
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

// Logout User
router.get('/logout', controller.logoutUser)

export default router