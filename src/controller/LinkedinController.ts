import passport from "passport";
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy
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


passport.use(new LinkedinStrategy({
    clientID: process.env.lclientID,
    clientSecret: process.env.lclientSecret, 
    callbackURL: process.env.lcallbackURL,
    scope: ['r_emailaddress', 'r_liteprofile']
}, (accessToken: any, refreshToken: any, profile: any, done: any) => {
    // console.log(profile)
    //Check if the user already exists in the database
    Social.findOne({ linkedinId: profile.id })
    .then((currentUser) => {
        if(currentUser) {
            // User is in the DB
            // console.log('User is: ', currentUser)
            done(null, currentUser)
        }
        else {
            // Create new user in the DB
            new Social({
                username: profile.displayName,
                linkedinId: profile.id,
                email: profile.emails[0].value
            }).save()
            .then((newUser) => {
                // console.log('New User created: ' + newUser)
                done(null, newUser)
            })
        }
    })
    .catch((err) => {
        console.log(err)
    })
}))
