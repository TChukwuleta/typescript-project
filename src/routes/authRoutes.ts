import express, { Request, Response } from 'express'
import passport from 'passport'
const router = express.Router()

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
router.get('/logout', (req: Request, res: Response) => {
    req.logout()
    res.redirect('/')
})

export default router