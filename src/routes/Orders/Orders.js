"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Orders_1 = require("../../controllers/Orders/Orders");
var Auth_1 = require("../Middlewares/Auth/Auth");
// Endpoint router
var routes = (0, express_1.Router)();
// Routes definition
routes
    .get('/', Auth_1["default"].isAuthenticatedRequest, Orders_1["default"].getAll)
    .get('/:id', Auth_1["default"].isAuthenticatedRequest, Orders_1["default"].get)
    .post('/create/:id', Auth_1["default"].isAuthenticatedRequest, Orders_1["default"].create);
exports["default"] = routes;
