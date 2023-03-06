"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
/**
 * Auth class
 * @class
 */
var Auth = /** @class */ (function () {
    function Auth() {
    }
    /**
     * Generates the json web token
     * @param {Object} data
     */
    Auth.generateToken = function (data) {
        return (0, jsonwebtoken_1.sign)(data, String(process.env.JWT_SECRET || Auth.DEFAULT_JWT_SECRET));
    };
    Auth.DEFAULT_JWT_SECRET = 'epT4HtsxFmttafxYa4KmFcjt';
    return Auth;
}());
exports["default"] = Auth;
