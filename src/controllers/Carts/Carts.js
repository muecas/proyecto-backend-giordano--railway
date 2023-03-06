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
var Carts_1 = require("../../services/Carts/Carts");
var Logger_1 = require("../../services/Logger/Logger");
// Container
var storage = Carts_1["default"].getInstance();
/**
 * CartsControllers class
 * @class
 */
var CartsControllers = /** @class */ (function () {
    function CartsControllers() {
    }
    /**
     * Gets a cart
     * @param {Request} request
     * @param {Response} response
     */
    CartsControllers.get = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, storage
                                .get(request.params.id)
                                .then(function (result) {
                                result !== null ?
                                    response.json({ cart: result.toObject() }) :
                                    response.json({
                                        error: 'Carro de compras no encontrado'
                                    });
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar cargar el carro: ".concat(err));
                                response.json({
                                    error: 'Ocurrió un error al intentar cargar el carro'
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
     * Creates a cart
     * @param {Request} request
     * @param {Response} response
     */
    CartsControllers.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, storage
                                .create()
                                .then(function (result) {
                                result !== false ?
                                    response.json({
                                        message: 'Carro creado con éxito',
                                        cart: result.toObject()
                                    }) :
                                    response.json({
                                        error: 'Ocurrió un error al intentar ingresar el carro'
                                    });
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar ingresar el carro: ".concat(err));
                                response.json({
                                    error: 'Ocurrió un error al intentar ingresar el carro'
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
     * Delete cart
     * @param {Request} request
     * @param {Response} response
     */
    CartsControllers["delete"] = function (request, response) {
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
                                            error: 'Carro de compras no encontrado'
                                        });
                                    }
                                    else {
                                        response.json({
                                            message: 'Carro de compras eliminado con éxito'
                                        });
                                    }
                                }
                                else {
                                    response.json({
                                        error: 'Ocurrió un error al intentar eliminar el carro'
                                    });
                                }
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar eliminar el carro: ".concat(err));
                                response.json({
                                    error: 'Ocurrió un error al intentar eliminar el carro'
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
     * Get cart products
     * @param {Request} request
     * @param {Response} response
     */
    CartsControllers.getProducts = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, storage
                                .get(request.params.id)
                                .then(function (result) {
                                result !== null ?
                                    response.json({
                                        products: result.getProducts()
                                    }) :
                                    response.json({
                                        error: 'Carro de compras no encontrado'
                                    });
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar cargar los productos del carro: ".concat(err));
                                response.json({
                                    error: 'Ocurrió un error al intentar cargar los productos del carro'
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
     * Add products to cart
     * @param {Request} request
     * @param {Response} response
     */
    CartsControllers.addProducts = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        products = request.body.products.map(function (product) { return ({ id: product.id, amount: Number(product.amount) }); });
                        return [4 /*yield*/, storage
                                .addToCart(request.params.id, products)
                                .then(function (result) {
                                if (result !== false) {
                                    if (result === null) {
                                        response.json({
                                            error: 'Carro de compras no encontrado'
                                        });
                                    }
                                    else {
                                        response.json({
                                            message: 'Productos agregados al carro con éxito',
                                            cart: result
                                        });
                                    }
                                }
                                else {
                                    response.json({
                                        error: 'Ocurrió un error al intentar editar el carro'
                                    });
                                }
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar agregar el producto al carro: ".concat(err));
                                response.json({
                                    error: 'Ocurrió un error al intentar agregar el producto el carro'
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
     * Delete product from cart
     * @param {Request} request
     * @param {Response} response
     */
    CartsControllers.deleteProduct = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, storage
                                .removeFromCart(request.params.id, request.params.product_id)
                                .then(function (result) {
                                if (result !== false) {
                                    if (result === null) {
                                        response.json({
                                            error: 'Carro de compras no encontrado'
                                        });
                                    }
                                    else {
                                        response.json({
                                            message: 'Producto eliminado al carro con éxito',
                                            cart: result.toObject()
                                        });
                                    }
                                }
                                else {
                                    response.json({
                                        error: 'Ocurrió un error al intentar editar el carro'
                                    });
                                }
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar eliminar el producto del carro: ".concat(err));
                                response.json({
                                    error: 'Ocurrió un error al intentar eliminar el producto del carro'
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CartsControllers;
}());
exports["default"] = CartsControllers;
