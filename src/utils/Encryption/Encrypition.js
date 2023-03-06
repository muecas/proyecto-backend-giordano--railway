"use strict";
exports.__esModule = true;
var bcrypt = require("bcrypt");
/**
 * Encrypition class
 * @class
 */
var Encrypition = /** @class */ (function () {
    function Encrypition() {
    }
    /**
     * Compare two strings
     * @param {*} str1
     * @param {*} str2
     * @return {boolean}
     */
    Encrypition.compare = function (str1, str2) {
        return bcrypt.compareSync(str1, str2);
    };
    /**
     * Encrypts a string
     * @param {*} str
     * @return {String}
     */
    Encrypition.create = function (str) {
        return bcrypt.hashSync(str, bcrypt.genSaltSync(10));
    };
    return Encrypition;
}());
exports["default"] = Encrypition;
