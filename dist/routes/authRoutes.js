"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controller/userController"));
var passport_1 = __importDefault(require("passport"));
var router = express_1.default.Router();
var auth_1 = __importDefault(require("../middleware/auth"));
// Index Routes
router.get('/', userController_1.default.homePage);
// Login 
router.get('/login', userController_1.default.signinGet);
router.post('/login', userController_1.default.signinPost);
// Signup
router.get('/signup', userController_1.default.signupGet);
router.post('/signup', userController_1.default.signupPost);
// Forget Password
router.get('/forgot-password', userController_1.default.forgetpassGet);
router.post('/forgot-password', userController_1.default.forgetpassPost);
// Dashboard page
router.get('/dashboarded', auth_1.default.ensureAuth, function (req, res) {
    res.render('dashboarded.ejs');
});
router.get('/dashboard', auth_1.default.checkAuthentication, function (req, res) {
    res.render('dashboard.ejs', { user: req.user });
});
// Edit profile
router.get('/editprofile', auth_1.default.ensureAuth, userController_1.default.editprofileGet);
router.put('/editprofile', userController_1.default.editprofilePost);
// Edit Socials profile
router.get('/editprofilee', auth_1.default.checkAuthentication, userController_1.default.editprofileSGet);
router.put('/editprofilee', userController_1.default.editprofileSPost);
// Forgot password
router.post('/forgot-password', userController_1.default.forgetpassPost);
// Google login and authenticate  
router.get('/auth/google', passport_1.default.authenticate('google', {
    scope: ['email', 'profile']
}));
router.get('/auth/google/redirect', passport_1.default.authenticate('google', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/dashboard');
});
// LinkedIn login and authentication
router.get('/auth/linkedin', passport_1.default.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile']
}));
router.get('/auth/linkedin/redirect', passport_1.default.authenticate('linkedin', {
    failureRedirect: '/',
    successRedirect: '/dashboard'
}));
// Logout User
router.get('/logout', userController_1.default.logoutUser);
exports.default = router;
