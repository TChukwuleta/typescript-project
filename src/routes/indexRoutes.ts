import express, { Request, Response } from 'express'
const router = express.Router()
import controller from '../controller/userController'

// Login or landing page
router.get('/', (req: Request, res: Response) => {
    res.render('index.ejs')
})

// Dashboard page
router.get('/dashboard', (req: Request, res: Response) => {
    res.send('Dashboard')
})

// Profile page
router.get('/profile', (req: Request, res: Response) => {
    res.render('profile.ejs', { user: req.user })
})


export default router