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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controller/userController"));
var passport_1 = __importDefault(require("passport"));
var dotenv = __importStar(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv.config();
var router = express_1.default.Router();
var auth_1 = __importDefault(require("../middleware/auth"));
var testModel_1 = __importDefault(require("../models/testModel"));
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
router.get('/dashboard', auth_1.default.checkAuthentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqUser;
    return __generator(this, function (_a) {
        reqUser = req.user;
        testModel_1.default.findOne({ email: reqUser.email }, function (err, data) {
            if (data) {
                res.render('dashboard.ejs', { user: reqUser });
            }
            else {
                var user = new testModel_1.default({
                    username: data.username,
                    email: data.email
                });
                user.save()
                    .then(function (deet) {
                    var createToken = jsonwebtoken_1.default.sign({ id: deet }, "" + process.env.jkeys, {
                        expiresIn: 12 * 60 * 60
                    });
                    res.cookie('jwt', createToken, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
                    res.render('dashboard.ejs', { user: deet });
                    res.status(201).json({ user: deet._id });
                })
                    .catch(function (e) {
                    console.log(e);
                });
            }
        });
        return [2 /*return*/];
    });
}); });
// router.get('/dashboard', ri.checkAuthentication, (req: Request, res: Response) => {
//     res.render('dashboard.ejs', { user: req.user }) 
// }) 
// Logout User
router.get('/logout', userController_1.default.logoutUser);
exports.default = router;
