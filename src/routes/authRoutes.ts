import express, { Request, Response } from 'express'
import controller from '../controller/userController'
import passport from 'passport'
const router = express.Router()
import ensureAuth from '../middleware/auth'
import checkUser from '../middleware/auth'

router.get('*', checkUser)

// Signup
router.get('/signup', controller.signupGet)


router.post('/signup', controller.signupPost)

// Login 
router.get('/login', controller.signinGet)

router.post('/login', controller.signinPost)

// Forget Password
router.post('/forgetpass', controller.forgetPass);



// Index Routes
// landing and Register
router.get('/', (req: Request, res: Response) => {
    res.render('index.ejs')
})

// Login Page
router.get('/login', (req: Request, res: Response) => {
    res.render('login.ejs')
})

// Dashboard page
router.get('/dashboard', (req: Request, res: Response) => {
    res.send('Dashboard')
})

// Profile page
router.get('/profile', (req: Request, res: Response) => {
    res.render('profile.ejs', { user: req.user })
})

router.get('/dashboard', (req: Request, res: Response) => {
    res.render('profile.ejs', { user: req.user })
})



// Google login and authenticate  
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/' }),
 (req: Request, res: Response) => {
    res.redirect('/profile')
})

// LinkedIn login and authentication
router.get('/auth/linkedin', passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile']
}))

router.get('/auth/linkedin/redirect', passport.authenticate('linkedin', { 
    failureRedirect: '/',
    successRedirect: '/profile'})
)

// Logout User
router.get('/logout', controller.logoutUser)

export default router