"use strict";
exports.__esModule = true;
var winston = require("winston");
// Transports definition
var transports = [
    new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
];
// Console transport for development instances
if (process.env.NODE_ENV !== 'production')
    transports.push(new winston.transports.Console());
// Initializes the logger
var logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: transports
});
exports["default"] = logger;
