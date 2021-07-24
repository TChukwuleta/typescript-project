import passport from 'passport'
const GoogleStrategy = require('passport-google-oauth2').Strategy
import Social from '../models/socialModel'
import * as dotenv from "dotenv";

dotenv.config();


passport.serializeUser((user: any, done: any) => {
    done(null, user.id)
})

passport.deserializeUser((id: string, done: any) => {
    Social.findById(id).then((user) => {
        done(null, user)
    })  
})


passport.use(new GoogleStrategy({
    clientID: `${process.env.gclientID}`,
    clientSecret: `${process.env.gclientSecret}`,
    callbackURL: `${process.env.gcallbackURL}`,
    passReqToCallback: true
}, (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log(profile)
    // Check if the user already exists in the database
    Social.findOne({ googleId: profile.id })
    .then((currentUser) => {
        if(currentUser) {
            // User is in DB
            console.log('User is: ', currentUser)
            done(null, currentUser)
        }
        else {
            // Create user in the DB
            new Social({
                username: profile.displayName,
                googleId: profile.id,
                // email: profile.email
            }).save()
            .then((newUser) => {
                console.log('New User created: ' + newUser)
                done(null, newUser) 
            })
        }
    }) 
    .catch((err) => {
        console.log(err)
    })
}))
