"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
exports.passport = void 0;
var express_1 = require("express");
var passport = require("passport");
exports.passport = passport;
var passport_local_1 = require("passport-local");
var Users_1 = require("../../services/Users/Users");
var Encrypition_1 = require("../../utils/Encryption/Encrypition");
var Logger_1 = require("../../services/Logger/Logger");
var Auth_1 = require("../../controllers/Auth/Auth");
var Auth_2 = require("../Middlewares/Auth/Auth");
var Validation_1 = require("../../utils/Validation/Validation");
var Email_1 = require("../../services/Email/Email");
// Storage
var storage = Users_1["default"].getInstance();
// Login
passport.use('login', new passport_local_1.Strategy({
    usernameField: 'email'
}, function (email, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, storage.getBy('email', email)
                    .then(function (result) {
                    if (result === null || Encrypition_1["default"].compare(password, result.toObject(false, true).password) === false) {
                        Logger_1["default"].log('warn', "Intento de login de usuario fallido (email: ".concat(email));
                        done(null, false);
                    }
                    else {
                        Logger_1["default"].log('info', "Login de usuario exitoso (email: ".concat(email));
                        done(null, result.toObject(true).id);
                    }
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }));
// Signup
passport.use('signup', new passport_local_1.Strategy({
    usernameField: 'email',
    passReqToCallback: true
}, function (request, email, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, storage.getBy('email', email)
                    .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                    var name_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(result !== null)) return [3 /*break*/, 1];
                                done(null, false);
                                return [3 /*break*/, 3];
                            case 1:
                                name_1 = request.body.name;
                                return [4 /*yield*/, storage.create({ name: name_1, email: email, password: Encrypition_1["default"].create(password) })
                                        .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                                        var isValidationError;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(result !== false)) return [3 /*break*/, 3];
                                                    isValidationError = Validation_1["default"].isValidationResult(result) === true && result.errors.length > 0;
                                                    if (!(isValidationError === false)) return [3 /*break*/, 2];
                                                    Logger_1["default"].log('info', "Usuario registrado con \u00E9xito (email: ".concat(email, ")"));
                                                    return [4 /*yield*/, Email_1["default"].getInstance().send('Usuario registrado', "<p>Usuario registrado con \u00E9xito.</p><p><strong>Nombre:</strong> ".concat(name_1, "<br><strong>Email:</strong> ").concat(email, ".</p>"))];
                                                case 1:
                                                    _a.sent();
                                                    _a.label = 2;
                                                case 2:
                                                    done(null, isValidationError === true ? false : result);
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    done(null, false);
                                                    _a.label = 4;
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }));
// Serialize / deserialize
passport.serializeUser(function (id, done) { return done(null, id); });
passport.deserializeUser(function (id, done) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, storage.get(id).then(function (result) { return done(null, result); })];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
// Endpoint router
var routes = (0, express_1.Router)();
// Login/signup success redirect
var successRedirect = '/user-profile';
// Routes definition
routes
    .get('/login', Auth_1["default"].login)
    .post('/login', passport.authenticate('login', { failureRedirect: '/login?error', successRedirect: successRedirect }))
    .get('/signup', Auth_2["default"].isAuthenticated(function (request, response, next) {
    return response.redirect(successRedirect);
}, function (request, response, next) {
    next();
}), Auth_1["default"].signup)
    .post('/signup', passport.authenticate('signup', { failureRedirect: '/signup?error', successRedirect: successRedirect }))
    .get('/logout', Auth_1["default"].logout)
    .get(successRedirect, Auth_2["default"].isAuthenticated(Auth_1["default"].userProfile, function (request, response, next) {
    return response.redirect('/login');
}))
    .post('/api/auth', Auth_1["default"].auth);
exports["default"] = routes;
