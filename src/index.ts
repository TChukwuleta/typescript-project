import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes'
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser' 
import bodyParser from 'body-parser'
const GoogleController = require('./controller/GoogleController')
const LinkedinController = require('./controller/LinkedinController')
import * as dotenv from "dotenv";
 
dotenv.config();
  
const app: Express = express()
 
// Setup DB
mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Nanana')
})
.catch((e) => {
    console.log(e)
}) 

//Template engine
app.set('views', __dirname + '/views') 
app.set('view engine', 'ejs')

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'NoMoreASecret',
    resave: true
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRoutes)

// ALl other undefined Routes
app.get('*', (req: Request, res: Response) => {
    res.send('A Fake route')
})


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})