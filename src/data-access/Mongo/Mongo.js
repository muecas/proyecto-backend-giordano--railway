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
var mongodb_1 = require("mongodb");
/**
 * Mongo data access class
 * @class
 */
var Mongo = /** @class */ (function () {
    /**
     * Constructor
     * @param {ConnectionConfig} config
     * @param {String}           collectionName
     */
    function Mongo(config, collectionName) {
        this.aggregationFields = {};
        // Sets the table name
        this.collectionName = collectionName;
        // Creates the connection
        var client = new mongodb_1.MongoClient(config.uri);
        var database = client.db(config.database);
        this.collection = database.collection(this.collectionName);
    }
    /**
     * Creates the record
     * @param {Object} data
     * @return {Promise<boolean>}
     */
    Mongo.prototype.insert = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection
                            .insertOne(data)
                            .then(function (_a) {
                            var insertedId = _a.insertedId;
                            return insertedId;
                        })["catch"](function (err) {
                            return false;
                        })];
                    case 1:
                        result = _a.sent();
                        // Unsets the id
                        delete data._id;
                        // (:
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Updated the record
     * @param {*}      id
     * @param {Object} data
     * @return {Promise<boolean>}
     */
    Mongo.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection
                            .updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: data })
                            .then(function () { return true; })["catch"](function (err) {
                            return false;
                        })];
                    case 1: 
                    // (:
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Deletes the record
     * @param {*} id
     * @return {Promise<boolean>}
     */
    Mongo.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection
                            .deleteOne({ _id: new mongodb_1.ObjectId(id) })
                            .then(function () { return true; })["catch"](function (err) {
                            return false;
                        })];
                    case 1: 
                    // (:
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets a record by id
     * @param {*} id
     * @return {object|boolean}
     */
    Mongo.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection
                            .aggregate([
                            this.aggregationFields,
                            {
                                $match: {
                                    id: new mongodb_1.ObjectId(id)
                                }
                            },
                            {
                                $limit: 1
                            }
                        ])
                            .toArray()["catch"](function (err) {
                            return null;
                        })];
                    case 1:
                        result = _a.sent();
                        // (:
                        return [2 /*return*/, result !== null && result.length > 0 ? result[0] : null];
                }
            });
        });
    };
    /**
     * Gets a record by any field
     * @param {*} field
     * @param {*} value
     * @return {object|boolean}
     */
    Mongo.prototype.getBy = function (field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.collection
                            .aggregate([
                            this.aggregationFields,
                            {
                                $match: (_a = {},
                                    _a[field] = value,
                                    _a)
                            },
                            {
                                $limit: 1
                            }
                        ])
                            .toArray()["catch"](function (err) {
                            return null;
                        })];
                    case 1:
                        result = _b.sent();
                        // (:
                        return [2 /*return*/, result !== null && result.length > 0 ? result[0] : null];
                }
            });
        });
    };
    /**
     * Gets all record by any field
     * @param {*} field
     * @param {*} value
     * @return {object|boolean}
     */
    Mongo.prototype.getAllBy = function (field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.collection
                            .aggregate([
                            this.aggregationFields,
                            {
                                $match: (_a = {},
                                    _a[field] = value,
                                    _a)
                            }
                        ])
                            .toArray()["catch"](function (err) {
                            return null;
                        })];
                    case 1:
                        result = _b.sent();
                        // (:
                        return [2 /*return*/, result !== null && result.length > 0 ? result : null];
                }
            });
        });
    };
    /**
     * Gets all records
     * @return {Array|boolean}
     */
    Mongo.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection.aggregate([
                            this.aggregationFields
                        ]).toArray()];
                    case 1: 
                    // (:
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Mongo;
}());
exports["default"] = Mongo;
