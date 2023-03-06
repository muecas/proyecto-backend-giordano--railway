"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Produts_1 = require("../../controllers/Products/Produts");
var Auth_1 = require("../Middlewares/Auth/Auth");
// Endpoint router
var routes = (0, express_1.Router)();
// Routes definition
routes
    .get('/', Produts_1["default"].getAll)
    .get('/:id', Produts_1["default"].get)
    .post('/', Auth_1["default"].isAuthenticatedRequest, Produts_1["default"].create)
    .put('/:id', Auth_1["default"].isAuthenticatedRequest, Produts_1["default"].update)
    .patch('/:id', Auth_1["default"].isAuthenticatedRequest, Produts_1["default"].update)["delete"]('/:id', Auth_1["default"].isAuthenticatedRequest, Produts_1["default"]["delete"]);
exports["default"] = routes;
