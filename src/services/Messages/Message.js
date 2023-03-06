"use strict";
exports.__esModule = true;
var Message = /** @class */ (function () {
    /**
     * Message constructor
     * @param {String|number|undefined} id
     * @param {string|undefined}        email
     * @param {PathLike|undefined}      avatar
     * @param {string|undefined}        message
     * @param {number|undefined}        timestamp
     */
    function Message(_a) {
        var id = _a.id, email = _a.email, avatar = _a.avatar, message = _a.message, timestamp = _a.timestamp;
        this.id = id;
        this.email = email;
        this.avatar = avatar;
        this.message = message;
        this.timestamp = timestamp;
    }
    /**
     * Returns as object
     * @param {boolean} id
     * @return {MessageType}
     */
    Message.prototype.toObject = function (id) {
        if (id === void 0) { id = true; }
        // Sets the returning object
        var object = {
            email: this.email,
            avatar: this.avatar,
            message: this.message,
            timestamp: this.timestamp
        };
        // Include id if needed
        id === true && (object.id = this.id);
        // (:
        return object;
    };
    return Message;
}());
exports["default"] = Message;
