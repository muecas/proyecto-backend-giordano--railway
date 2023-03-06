"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    /**
     * User constructor
     * @param {String|number|undefined} id
     * @param {String|undefined}        name
     * @param {String|undefined}        email
     * @param {String|undefined}        password
     */
    function User(_a) {
        var id = _a.id, name = _a.name, email = _a.email, password = _a.password;
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    /**
     * Gets the user id
     * @return {String|number|undefined}
     */
    User.prototype.getId = function () {
        return this.id;
    };
    /**
     * Returns as object
     * @param {boolean} id
     * @return {UserType}
     */
    User.prototype.toObject = function (id, password) {
        if (id === void 0) { id = true; }
        if (password === void 0) { password = false; }
        // Sets the returning object
        var object = {
            name: this.name,
            email: this.email
        };
        // Include id and password if needed
        id === true && (object.id = this.id);
        password === true && (object.password = this.password);
        // (:
        return object;
    };
    return User;
}());
exports["default"] = User;
