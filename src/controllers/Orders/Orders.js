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
var Orders_1 = require("../../services/Orders/Orders");
var Validation_1 = require("../../utils/Validation/Validation");
var Logger_1 = require("../../services/Logger/Logger");
var Carts_1 = require("../../services/Carts/Carts");
var Email_1 = require("../../services/Email/Email");
// Container
var storage = Orders_1["default"].getInstance();
var carts = Carts_1["default"].getInstance();
/**
 * OrdersControllers class
 * @class
 */
var OrdersControllers = /** @class */ (function () {
    function OrdersControllers() {
    }
    /**
     * Gets all orders
     * @param {Request}  request
     * @param {Response} response
     */
    OrdersControllers.getAll = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, storage
                                .getAllBy('user', String(request.user.toObject().id))
                                .then(function (orders) {
                                response.send({ orders: orders.map(function (order) { return order.toObject(); }) });
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar cargar las ordenes: ".concat(err));
                                response.json({ error: 'Ocurrió un error al intentar cargar las ordenes' });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets an order
     * @param {Request}  request
     * @param {Response} response
     */
    OrdersControllers.get = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, storage
                                .get(request.params.id)
                                .then(function (result) {
                                if (result !== null) {
                                    var resultObj = result.toObject();
                                    if (String(resultObj.user) === String(request.user.toObject().id)) {
                                        response.json({ order: resultObj });
                                    }
                                    else {
                                        response.json({
                                            error: 'La orden no pertenece a tu usuario'
                                        });
                                    }
                                }
                                else {
                                    response.json({
                                        error: 'Orden no encontrada'
                                    });
                                }
                            })["catch"](function (err) {
                                Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar cargar la orden: ".concat(err));
                                response.json({
                                    error: 'Ocurrió un error al intentar cargar la orden'
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
     * Creates an order
     * @param {Request}  request
     * @param {Response} response
     */
    OrdersControllers.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        return [4 /*yield*/, carts.get(request.params.id)
                                .then(function (cart) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(cart !== null)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, storage
                                                    .create(request.user.toObject().id, cart.toObject())
                                                    .then(function (order) { return __awaiter(_this, void 0, void 0, function () {
                                                    var orderObj, detail;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!(order !== false)) return [3 /*break*/, 5];
                                                                if (!(Validation_1["default"].isValidationResult(order) === true && order.errors.length > 0)) return [3 /*break*/, 1];
                                                                response.json({
                                                                    error: 'Verifica los campos ingresados',
                                                                    errors: order.errors
                                                                });
                                                                return [3 /*break*/, 4];
                                                            case 1:
                                                                orderObj = order.toObject();
                                                                return [4 /*yield*/, carts.remove(request.params.id)];
                                                            case 2:
                                                                _a.sent();
                                                                detail = (orderObj.products || []).map(function (line) { return "".concat(line.name, " (x").concat(line.amount, " - $ ").concat(line.price, ")"); }).join('<br>');
                                                                Logger_1["default"].log('info', "Nueva orden creada");
                                                                return [4 /*yield*/, Email_1["default"].getInstance().send('Nueva orden generada', "<p>Orden ingresada con \u00E9xito.</p><p>Detalle de la orden:<br>".concat(detail, "</p><p>Cantidad de productos: ").concat(orderObj.count, "<br>Total: ").concat(orderObj.total, "</p>"))];
                                                            case 3:
                                                                _a.sent();
                                                                response.json({
                                                                    message: 'Orden creada con éxito',
                                                                    order: orderObj
                                                                });
                                                                _a.label = 4;
                                                            case 4: return [3 /*break*/, 6];
                                                            case 5:
                                                                response.json({
                                                                    error: 'Ocurrió un error al intentar ingresar la orden'
                                                                });
                                                                _a.label = 6;
                                                            case 6: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })["catch"](function (err) {
                                                    Logger_1["default"].log('error', "Ocurri\u00F3 un error al intentar ingresar la orden: ".concat(err));
                                                    response.json({
                                                        error: 'Ocurrió un error al intentar ingresar la orden'
                                                    });
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            response.json({
                                                error: 'Carro de compras no encontrado'
                                            });
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
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
    return OrdersControllers;
}());
exports["default"] = OrdersControllers;
