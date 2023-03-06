"use strict";
exports.__esModule = true;
var options = {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/',
    database: process.env.DB_NAME || 'ecommerce'
};
exports["default"] = options;
