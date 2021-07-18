import passport from 'passport'
const GoogleStrategy = require('passport-google-oauth2').Strategy
import User from '../models/userModel'
const keys = require('../../keys')


passport.serializeUser((user: any, done: any) => {
    done(null, user.id)
})

passport.deserializeUser((id: string, done: any) => {
    User.findById(id).then((user) => {
        done(null, user)
    })  
})


passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: keys.google.callbackURL,
    passReqToCallback: true
}, (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log(profile)
    // Check if the user already exists in the database
    User.findOne({ googleId: profile.id })
    .then((currentUser) => {
        if(currentUser) {
            // User is in DB
            console.log('User is: ', currentUser)
            done(null, currentUser)
        }
        else {
            // Create user in the DB
            new User({
                username: profile.displayName,
                googleId: profile.id,
                email: profile.email
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
