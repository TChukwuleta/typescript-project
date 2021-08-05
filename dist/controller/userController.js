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
var userModel_1 = __importDefault(require("../models/userModel"));
var testModel_1 = __importDefault(require("../models/testModel"));
var joi_1 = __importDefault(require("joi"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Handle errors
var handleErrors = function (err) {
    console.log(err.message, err.code);
    var errors = { email: '', password: '', username: '' };
    // Incorrect email 
    if (err.message === 'Incorrect email') {
        errors.email = 'This email is not registered';
    }
    // Incorrect Password
    if (err.message === 'Incorrect password') {
        errors.password = 'The password entered is incorrect';
    }
    // Duplicate error code
    if (err.code === 11000) {
        errors.email = 'This email is already registered';
        return errors;
    }
    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(function (error) {
            var key = error.properties.path;
            if (key === 'email' || key === 'password' || key === 'username') {
                errors[key] = error.properties.message;
            }
        });
    }
    return errors;
};
// Token
var createToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, "" + process.env.jkeys, {
        expiresIn: 12 * 60 * 60
    });
};
// Validation for reset password
var resetSchema = joi_1.default.object({
    email: joi_1.default.string().email().required()
});
var rpSchema = joi_1.default.object({
    password: joi_1.default.string().required()
});
// Index Route controller
var homePage = function (req, res) {
    res.render('home.ejs');
};
// Sign up GET controller
var signupGet = function (req, res) {
    res.render('index.ejs');
};
// Sign up POST controller
var signupPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, username, user, token, e_1, errorsss;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, username = _a.username;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel_1.default.create({ username: username, email: email, password: password })];
            case 2:
                user = _b.sent();
                token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
                res.status(201).json({ user: user._id });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                errorsss = handleErrors(e_1);
                res.status(400).json({ errorsss: errorsss });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Sign In GET controller  
var signinGet = function (req, res) {
    res.render('login.ejs');
};
// Sign in POST controller
var signinPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, token, e_2, errorsss;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel_1.default.login(email, password)];
            case 2:
                user = _b.sent();
                token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.status(200).json({ user: user.id });
                // console.log(req.body)
                console.log(req.user);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                errorsss = handleErrors(e_2);
                res.status(400).json({ errorsss: errorsss });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Logout user
var logoutUser = function (req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    req.logout();
    res.redirect('/');
    // req.logout()
    // res.redirect('/')
};
// Forget Password
var forgetpassGet = function (req, res, next) {
    res.render('forgotpass.ejs');
};
var forgetpassPost = function (req, res, next) {
    var _a = req.body, email = _a.email, npassword = _a.npassword, cnpassword = _a.cnpassword;
    console.log(req.body);
    userModel_1.default.findOne({ email: email }, function (err, data) {
        console.log(data);
        if (!data) {
            console.log('Not registered email');
            res.json({ "Error": "This email is not registered" });
        }
        else {
            if (npassword != cnpassword) {
                console.log('Password doesnt match');
                res.json({ "Error": "Password doesnt match! Both password must match" });
            }
            else {
                data.password = npassword;
                data.save(function (err, Person) {
                    if (err) {
                        handleErrors(err);
                    }
                    else {
                        console.log('Password Changed');
                        res.json({ "Success": "Password Changed successfully" });
                    }
                });
            }
        }
    });
};
// Forget password with email token verification
var forgetttpassPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = resetSchema.validate(req.body).error;
                if (error) {
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                }
                return [4 /*yield*/, userModel_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ "Error": "Uawe with given mail doesn't exist" })];
                }
                return [2 /*return*/];
        }
    });
}); };
var resetpassPost = function (req, res, next) {
    var _a = req.body, email = _a.email, npassword = _a.npassword, cnpassword = _a.cnpassword;
    console.log(req.body);
    userModel_1.default.findOne({ email: email }, function (err, data) {
        console.log(data);
        if (!data) {
            console.log('Not registered email');
            res.json({ "Error": "This email is not registered" });
        }
        else {
            if (npassword != cnpassword) {
                console.log('Password doesnt match');
                res.json({ "Error": "Password doesnt match! Both password must match" });
            }
            else {
                data.password = npassword;
                data.save(function (err, Person) {
                    if (err) {
                        handleErrors(err);
                    }
                    else {
                        console.log('Password Changed');
                        res.json({ "Success": "Password Changed successfully" });
                    }
                });
            }
        }
    });
};
// Edit profile GET method
var editprofileGet = function (req, res, next) {
    res.render('editprofile.ejs');
};
// Edit profile POST method
var editprofilePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel_1.default.updateOne({ email: req.body.email }, { $set: {
                            username: req.body.username,
                            mobile: req.body.mobile,
                            bio: req.body.bio,
                            summary: req.body.summary
                        } }, { new: true })];
            case 1:
                user = _a.sent();
                console.log(user);
                res.send(user);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                console.log(e_3);
                res.send(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Edit Social profile GET method
var editprofileSGet = function (req, res, next) {
    res.render('profile.ejs', { user: req.user });
    console.log(req.user);
};
// Edit Social profile POST method
var editprofileSPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, testModel_1.default.updateOne({ email: req.body.email }, { $set: {
                            username: req.body.username,
                            mobile: req.body.mobile,
                            bio: req.body.bio,
                            summary: req.body.summary
                        } }, { new: true })];
            case 1:
                user = _a.sent();
                console.log(user);
                res.send(user);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                console.log(e_4);
                res.send(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var sssP = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqUser;
    return __generator(this, function (_a) {
        reqUser = req.user;
        testModel_1.default.findOne({ email: reqUser.email }, function (err, data) {
            if (data) {
                console.log('Userrrrr is: ', data);
                res.render('dashboard.ejs', { user: data });
            }
            else {
                var user = new testModel_1.default({
                    email: reqUser.email,
                    username: reqUser.username
                });
                user.save()
                    .then(function (he) {
                    console.log('Userrr is: ', he);
                    var token = createToken(he._id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
                    res.render('dashboard.ejs', { user: he });
                })
                    .catch(function (e) {
                    console.log(e);
                });
            }
        });
        return [2 /*return*/];
    });
}); };
exports.default = {
    homePage: homePage,
    signupGet: signupGet,
    signupPost: signupPost,
    signinGet: signinGet,
    signinPost: signinPost,
    forgetpassPost: forgetpassPost,
    logoutUser: logoutUser,
    forgetpassGet: forgetpassGet,
    editprofileGet: editprofileGet,
    editprofilePost: editprofilePost,
    editprofileSGet: editprofileSGet,
    editprofileSPost: editprofileSPost,
    forgetttpassPost: forgetttpassPost,
    resetpassPost: resetpassPost,
    sssP: sssP
};
