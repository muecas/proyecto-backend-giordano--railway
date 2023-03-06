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
var Products_1 = require("../../services/Products/Products");
var Validation_1 = require("../../utils/Validation/Validation");
var Logger_1 = require("../../services/Logger/Logger");
// Container
var storage = Products_1["default"].getInstance();
/**
 * ProductsControllers class
 * @class
 */
var ProductsControllers = /** @class */ (function () {
    function ProductsControllers() {
    }
    /**
     * Gets all products
     * @param {Request}  request
     * @param {Response} response
     */
    ProductsControllers.getAll = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, storage
                                .getAll()
                                .then(function (products) {
                                response.send({ products: products.map(function (product) { return product.toObject(); }) });
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar cargar los productos: ".concat(err));
                                response.json({ error: 'Ocurrió un error al intentar cargar los productos' });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets a product
     * @param {Request}  request
     * @param {Response} response
     */
    ProductsControllers.get = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, storage
                                .get(request.params.id)
                                .then(function (result) {
                                result !== null ?
                                    response.json({ product: result.toObject() }) :
                                    response.json({
                                        error: 'Producto no encontrado'
                                    });
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar cargar el producto: ".concat(err));
                                response.json({
                                    error: 'Ocurrió un error al intentar cargar el producto'
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates a product
     * @param {Request}  request
     * @param {Response} response
     */
    ProductsControllers.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, storage
                                .create({
                                name: request.body.name,
                                price: Number(request.body.price),
                                thumbnail: request.body.thumbnail
                            })
                                .then(function (result) {
                                if (result !== false) {
                                    Validation_1["default"].isValidationResult(result) === true && result.errors.length > 0 ?
                                        response.json({
                                            error: 'Verifica los campos ingresados',
                                            errors: result.errors
                                        }) :
                                        response.json({
                                            message: 'Producto creado con éxito',
                                            product: result.toObject()
                                        });
                                }
                                else {
                                    response.json({
                                        error: 'Ocurrió un error al intentar ingresar el producto'
                                    });
                                }
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar ingresar el producto: ".concat(err));
                                response.json({
                                    error: 'Ocurrió un error al intentar ingresar el producto'
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates a product
     * @param {Request}  request
     * @param {Response} response
     */
    ProductsControllers.update = function (request, response) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, storage
                                .edit(request.params.id, {
                                name: ((_a = request.body) === null || _a === void 0 ? void 0 : _a.name) || undefined,
                                price: ((_b = request.body) === null || _b === void 0 ? void 0 : _b.price) ? Number(request.body.price) : undefined,
                                thumbnail: ((_c = request.body) === null || _c === void 0 ? void 0 : _c.thumbnail) || undefined
                            })
                                .then(function (result) {
                                if (result !== false) {
                                    if (result === null) {
                                        response.json({
                                            error: 'Producto no encontrado'
                                        });
                                    }
                                    else {
                                        Validation_1["default"].isValidationResult(result) === true && result.errors.length > 0 ?
                                            response.json({
                                                error: 'Verifica los campos ingresados',
                                                errors: result.errors
                                            }) :
                                            response.json({
                                                message: 'Producto editado con éxito',
                                                product: result.toObject()
                                            });
                                    }
                                }
                                else {
                                    response.json({
                                        error: 'Ocurrió un error al intentar editar el producto'
                                    });
                                }
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar editar el producto: ".concat(err));
                                response.json({
                                    error: 'Ocurrió un error al intentar editar el producto'
                                });
                            })];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Deletes a product
     * @param {Request}  request
     * @param {Response} response
     */
    ProductsControllers["delete"] = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, storage
                                .remove(request.params.id)
                                .then(function (result) {
                                if (result !== false) {
                                    if (result === null) {
                                        response.json({
                                            error: 'Producto no encontrado'
                                        });
                                    }
                                    else {
                                        response.json({
                                            message: 'Producto eliminado con éxito'
                                        });
                                    }
                                }
                                else {
                                    response.json({
                                        error: 'Ocurrió un error al intentar eliminar el producto'
                                    });
                                }
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar eliminar el producto: ".concat(err));
                                response.json({
                                    error: 'Ocurrió un error al intentar eliminar el producto'
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ProductsControllers;
}());
exports["default"] = ProductsControllers;
