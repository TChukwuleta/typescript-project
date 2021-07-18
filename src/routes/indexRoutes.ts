import express, { Request, Response } from 'express'
const router = express.Router()

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


export default router