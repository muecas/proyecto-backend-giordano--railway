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
var Product_1 = require("./Product");
var Validation_1 = require("../../utils/Validation/Validation");
/**
 * Products class
 * @class
 */
var Products = /** @class */ (function (_super) {
    __extends(Products, _super);
    /**
     * Constructor
     * @param {ConnectionConfig} config
     */
    function Products(config) {
        var _this = 
        // Super constructor
        _super.call(this, config, 'products') || this;
        _this.aggregationFields = {
            $project: {
                _id: 0,
                id: '$_id',
                name: 1,
                price: 1,
                thumbnail: 1
            }
        };
        return _this;
    }
    /**
     * Gets the singleton instance
     * @return {Products}
     */
    Products.getInstance = function () {
        // Create the instance if needed
        typeof Products.instance === 'undefined' && (Products.instance = new Products(data_access_1.config));
        // (:
        return Products.instance;
    };
    /**
     * Saves a new product to the products storage
     * @param {ProductType} product
     * @return {Product|ValidationResult|boolean}
     */
    Products.prototype.create = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var validation, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validation = this.validateProduct(product);
                        // If any error ocurred
                        if (validation.errors.length > 0)
                            return [2 /*return*/, validation];
                        return [4 /*yield*/, this.insert(product)];
                    case 1:
                        result = _a.sent();
                        // (:
                        return [2 /*return*/, result !== false ? new Product_1["default"](__assign({ id: result }, product)) : false];
                }
            });
        });
    };
    /**
     * Updates a product
     * @param {number|String} id
     * @param {ProductType}   product
     * @return {Product|ValidationResult|false}
     */
    Products.prototype.edit = function (id, product) {
        return __awaiter(this, void 0, void 0, function () {
            var record, validation, update, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(id)];
                    case 1:
                        record = _a.sent();
                        // ):
                        if (record === null)
                            return [2 /*return*/, null];
                        validation = this.validateProduct(product);
                        // If any error ocurred
                        if (validation.valid.length === 0)
                            return [2 /*return*/, validation];
                        update = {};
                        // Gets the fields to update
                        validation.valid.map(function (valid) {
                            update[String(valid.field)] = product[String(valid.field)];
                        });
                        return [4 /*yield*/, _super.prototype.update.call(this, id, __assign({}, update))];
                    case 2:
                        result = _a.sent();
                        // (:
                        return [2 /*return*/, result === true ? new Product_1["default"](__assign(__assign({ id: id }, record.toObject()), update)) : false];
                }
            });
        });
    };
    /**
     * Deletes a product
     * @param {number|String} id
     * @return {boolean|null}
     */
    Products.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(id)];
                    case 1:
                        record = _a.sent();
                        // ):
                        if (record === null)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, _super.prototype["delete"].call(this, id)];
                    case 2: 
                    // (:
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets a product by id
     * @param {number|String} id
     * @return {Product|boolean}
     */
    Products.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.get.call(this, id)
                            .then(function (response) { return response ? new Product_1["default"](response) : null; })];
                    case 1: 
                    // Gets the product
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets all records
     * @return {Array<Product>|boolean}
     */
    Products.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.getAll.call(this)
                            .then(function (result) { return result ? result.map(function (product) { return new Product_1["default"](product); }) : []; })];
                    case 1: 
                    // Get all products
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Validates a product
     * @param {ProductType} date
     * @return {ValidationResults}
     */
    Products.prototype.validateProduct = function (data) {
        // (:
        return Validation_1["default"].validate(data, [
            {
                field: 'name',
                validator: function (value) {
                    return value !== null && value !== '';
                },
                message: 'El campo <name> es obligatorio'
            },
            {
                field: 'price',
                validator: function (value) {
                    return !isNaN(parseInt(value)) && Number(value) >= 0;
                },
                message: 'El campo <price> es obligatorio y debe ser un valor numérico'
            },
            {
                field: 'thumbnail',
                validator: function (value) {
                    return /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(value);
                },
                message: 'El campo <thumbnail> es obligatorio y debe ser del tipo url'
            }
        ]);
    };
    return Products;
}(data_access_1.Container));
exports["default"] = Products;
