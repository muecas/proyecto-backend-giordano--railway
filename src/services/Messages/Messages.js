"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var data_access_1 = require("../../data-access/data-access");
var Message_1 = require("./Message");
var data_access_2 = require("../../data-access/data-access");
var Validation_1 = require("../../utils/Validation/Validation");
/**
 * Messages class
 * @class
 */
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    /**
     * Constructor
     * @param {ConnectionConfig} config
     */
    function Messages(config) {
        var _this = 
        // Super constructor
        _super.call(this, config, 'messages') || this;
        _this.aggregationFields = {
            $project: {
                _id: 0,
                id: '$_id',
                email: 1,
                avatar: 1,
                message: 1,
                timestamp: 1
            }
        };
        return _this;
    }
    /**
     * Gets the singleton instance
     * @return {Messages}
     */
    Messages.getInstance = function () {
        // Create the instance if needed
        typeof Messages.instance === 'undefined' && (Messages.instance = new Messages(data_access_2.config));
        // (:
        return Messages.instance;
    };
    /**
     * Creates a new message
     * @param {MessageType} message
     * @return {Message|ValidationResult|boolean}
     */
    Messages.prototype.create = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var validation, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validation = this.validateProduct(message);
                        // If any error ocurred
                        if (validation.errors.length > 0)
                            return [2 /*return*/, validation];
                        // Sets the message timestamp
                        message.timestamp = Date.now();
                        return [4 /*yield*/, this.insert(message)];
                    case 1:
                        result = _a.sent();
                        /// (:
                        return [2 /*return*/, result !== false ? new Message_1["default"](__assign({ id: result }, message)) : false];
                }
            });
        });
    };
    /**
     * Gets all records
     * @return {Array<Message>|boolean}
     */
    Messages.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.getAll.call(this)
                            .then(function (result) { return result ? result.map(function (message) { return new Message_1["default"](message); }) : []; })];
                    case 1: 
                    // Get all products
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Validates a message
     * @param {MesageType} message
     * @return {ValidationResults}
     */
    Messages.prototype.validateProduct = function (data) {
        // (:
        return Validation_1["default"].validate(data, [
            {
                field: 'email',
                validator: function (value) {
                    return /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
                },
                message: 'El campo <email> es obligatorio y debe ser del tipo email'
            },
            {
                field: 'avatar',
                validator: function (value) {
                    return !!/^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/.test(value);
                },
                message: 'El campo <avatar> es obligatorio y debe ser del tipo url'
            },
            {
                field: 'message',
                validator: function (value) {
                    return value !== null && value !== '';
                },
                message: 'El campo <message> es obligatorio'
            }
        ]);
    };
    return Messages;
}(data_access_1.Container));
exports["default"] = Messages;
