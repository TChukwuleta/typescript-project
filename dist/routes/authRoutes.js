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
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controller/userController"));
var passport_1 = __importDefault(require("passport"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
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
router.post('/forget-password', userController_1.default.forgetttpassPost);
// Password Reset
router.post('/reset-password', userController_1.default.resetpassPost);
// Dashboard page
router.get('/dashboarded', auth_1.default.ensureAuth, function (req, res) {
    res.render('dashboarded.ejs');
});
// Edit profile
router.get('/editprofile', auth_1.default.ensureAuth, userController_1.default.editprofileGet);
router.put('/editprofile', userController_1.default.editprofilePost);
// Edit Socials profile
router.get('/editprofilee', auth_1.default.checkAuthentication, userController_1.default.editprofileSGet);
router.put('/editprofilee', userController_1.default.editprofileSPost);
// router.get('/auth/google/redirect', passport.authenticate('google', { 
//     failureRedirect: '/' }),
//  (req: Request, res: Response) => {
//     res.redirect('/dashboard') 
// })
// router.get('/dashboard', ri.checkAuthentication, (req: Request, res: Response) => {
//     res.render('dashboard.ejs', { user: req.user }) 
// }) 
// Google login and authenticate  
router.get('/auth/google', passport_1.default.authenticate('google', {
    scope: ['email', 'profile']
}));
router.get('/auth/google/redirect', passport_1.default.authenticate('google', {
    failureRedirect: '/'
}), function (req, res) {
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
// router.get('/dashboard', ri.checkAuthentication, controller.sssP)
router.get('/dashboard', userController_1.default.sssP);
// Logout User
router.get('/logout', userController_1.default.logoutUser);
exports.default = router;
