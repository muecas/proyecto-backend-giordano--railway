"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var yargs = require("yargs");
var helpers_1 = require("yargs/helpers");
var cluster_1 = require("cluster");
var os = require("os");
var Server_1 = require("./src/services/Server/Server");
var Logger_1 = require("./src/services/Logger/Logger");
// Initializes dotevn
(0, dotenv_1.config)();
// Command line arguments
var argv = yargs((0, helpers_1.hideBin)(process.argv)).option({
    port: { type: 'number', "default": process.env.PORT || Server_1["default"].DEFAULT_PORT, alias: 'p' },
    mode: { type: 'string', "default": process.env.MODE || 'fork', alias: 'm' },
    cpus: { type: 'number', "default": process.env.CPUS || os.cpus().length, alias: 'c' },
    gzip: { type: 'boolean', "default": process.env.GZIP ? Boolean(process.env.GZIP) : false, alias: 'g' }
}).argv;
// Destructed constants
var port = argv.port, mode = argv.mode, cpus = argv.cpus, gzip = argv.gzip;
// If on primary process
if (mode === 'cluster' && cluster_1["default"].isPrimary === true) {
    // Log
    Logger_1["default"].log('info', "Corriendo proceso principal (PID: ".concat(process.pid, ")."));
    // For each CPU, forks the process
    for (var x = 0, max = cpus; x < Math.min(max, os.cpus().length); x = x + 1) {
        cluster_1["default"].fork();
    }
}
else {
    // Creates the server
    var server = new Server_1["default"]({
        port: port,
        gzip: gzip,
        argv: argv,
        public: "".concat(__dirname, "/public"),
        views: "".concat(__dirname, "/views"),
        session: {
            type: process.env.SESSION_TYPE,
            secret: process.env.SESSION_SECRET_KEY,
            ttl: Number(process.env.SESSION_TTL),
            path: "".concat(__dirname, "/session-storage"),
            cookieMaxAge: Number(process.env.SESSION_COOKIE_MAXAGE),
            mongoUrl: "".concat(process.env.DB_URI).concat(process.env.DB_NAME)
        }
    });
    // Starts the server
    server.start();
}
