"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
var socialModel_1 = __importDefault(require("../models/socialModel"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
passport_1.default.deserializeUser(function (id, done) {
    socialModel_1.default.findById(id).then(function (user) {
        done(null, user);
    });
});
passport_1.default.use(new LinkedinStrategy({
    clientID: process.env.lclientID,
    clientSecret: process.env.lclientSecret,
    callbackURL: process.env.lcallbackURL,
    scope: ['r_emailaddress', 'r_liteprofile']
}, function (accessToken, refreshToken, profile, done) {
    // console.log(profile)
    //Check if the user already exists in the database
    socialModel_1.default.findOne({ linkedinId: profile.id })
        .then(function (currentUser) {
        if (currentUser) {
            // User is in the DB
            // console.log('User is: ', currentUser)
            done(null, currentUser);
        }
        else {
            // Create new user in the DB
            new socialModel_1.default({
                username: profile.displayName,
                linkedinId: profile.id,
                email: profile.emails[0].value
            }).save()
                .then(function (newUser) {
                // console.log('New User created: ' + newUser)
                done(null, newUser);
            });
        }
    })
        .catch(function (err) {
        console.log(err);
    });
}));
