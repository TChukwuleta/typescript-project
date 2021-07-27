"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
// landing and Register
router.get('/', function (req, res) {
    res.render('index.ejs');
});
// Login Page
router.get('/login', function (req, res) {
    res.render('login.ejs');
});
// Dashboard page
router.get('/dashboard', function (req, res) {
    res.send('Dashboard');
});
// Profile page
router.get('/profile', function (req, res) {
    res.render('profile.ejs', { user: req.user });
});
router.get('/dashboard', function (req, res) {
    res.render('profile.ejs', { user: req.user });
});
exports.default = router;
