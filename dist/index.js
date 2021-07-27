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
var mongoose_1 = __importDefault(require("mongoose"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var GoogleController = require('./controller/GoogleController');
var LinkedinController = require('./controller/LinkedinController');
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var app = express_1.default();
// Setup DB
mongoose_1.default.connect("" + process.env.START_MONGODB + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + process.env.END_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    console.log('Nanana');
})
    .catch(function (e) {
    console.log(e);
});
//Template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// Middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_session_1.default({
    secret: 'NoMoreASecret',
    resave: true
}));
app.use(cookie_parser_1.default());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/', authRoutes_1.default);
// ALl other undefined Routes
app.get('*', function (req, res) {
    res.send('A Fake route');
});
var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
    console.log("Server is up and running on port " + PORT);
});
