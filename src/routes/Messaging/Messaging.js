"use strict";
exports.__esModule = true;
var express_1 = require("express");
// Endpoint router
var routes = (0, express_1.Router)();
// Routes definition
routes
    .get('/', function (request, response) {
    response.setHeader('Content-Type', 'text/html; charset=UTF-8');
    response.render('messaging');
});
exports["default"] = routes;
