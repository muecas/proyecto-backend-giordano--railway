"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Carts_1 = require("../../controllers/Carts/Carts");
// Endpoint router
var routes = (0, express_1.Router)();
// Routes definition
routes
    .get('/:id', Carts_1["default"].get)
    .post('/', Carts_1["default"].create)["delete"]('/:id', Carts_1["default"]["delete"])
    .get('/:id/products', Carts_1["default"].getProducts)
    .post('/:id/products', Carts_1["default"].addProducts)["delete"]('/:id/products/:product_id', Carts_1["default"].deleteProduct);
exports["default"] = routes;
