"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express = require("express");
var http = require("http");
var express_handlebars_1 = require("express-handlebars");
var socket_io_1 = require("socket.io");
var Products_1 = require("../../routes/Products/Products");
var Carts_1 = require("../../routes/Carts/Carts");
var Messaging_1 = require("../../routes/Messaging/Messaging");
var Auth_1 = require("../../routes/Auth/Auth");
var Orders_1 = require("../../routes/Orders/Orders");
var Messaging_2 = require("../../controllers/Messaging/Messaging");
var compression = require("compression");
var Logger_1 = require("../Logger/Logger");
var os = require("os");
var Messages_1 = require("../Messages/Messages");
var session = require("express-session");
var SessionFileStore = require("session-file-store");
var MongoStore = require("connect-mongo");
var passport = require("passport");
/**
 * Server class
 * @class
 */
var Server = /** @class */ (function () {
    /**
     * Server constructor
     * @param {ServerOptions} options
     */
    function Server(options) {
        var _a, _b, _c, _d, _e, _f, _g;
        // Log
        Logger_1["default"].log('info', 'Inicializando servidor');
        // Sets the port
        this.port = Number((options === null || options === void 0 ? void 0 : options.port) || Server.DEFAULT_PORT);
        // Messaging instance
        this.messages = Messages_1["default"].getInstance();
        // Creates the server
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new socket_io_1.Server(this.server);
        // Extras
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(express.static((options === null || options === void 0 ? void 0 : options.public) || Server.DEFAULT_STATIC_PATH));
        // Handlebars template engine
        this.app.engine('handlebars', (0, express_handlebars_1.engine)({ defaultLayout: 'main' }));
        this.app.set('view engine', 'handlebars');
        this.app.set('views', (options === null || options === void 0 ? void 0 : options.views) || Server.DEFAULT_VIEWS_PATH);
        // Log
        Logger_1["default"].log('info', "Utilizando sesi\u00F3n en ".concat(((_a = options === null || options === void 0 ? void 0 : options.session) === null || _a === void 0 ? void 0 : _a.type) === 'MONGO_STORE' || Server.DEFAULT_SESSION_TYPE === 'MONGO_STORE' ? 'Mongo' : 'sistema de archivos'));
        // Session type definition
        var sessionOptions = ((_b = options === null || options === void 0 ? void 0 : options.session) === null || _b === void 0 ? void 0 : _b.type) === 'MONGO_STORE' || Server.DEFAULT_SESSION_TYPE === 'MONGO_STORE' ?
            {
                store: MongoStore.create({
                    mongoUrl: String((_c = options === null || options === void 0 ? void 0 : options.session) === null || _c === void 0 ? void 0 : _c.mongoUrl) || Server.DEFAULT_SESSION_MONGO_URL
                })
            } :
            {
                store: new (SessionFileStore(session))({
                    path: ((_d = options === null || options === void 0 ? void 0 : options.session) === null || _d === void 0 ? void 0 : _d.path) || Server.DEFAULT_SESSION_STORAGE_PATH,
                    ttl: ((_e = options === null || options === void 0 ? void 0 : options.session) === null || _e === void 0 ? void 0 : _e.ttl) || Server.DEFAULT_SESSION_TTL,
                    retries: 0
                })
            };
        // Session configuration
        this.app.use(session(__assign({ rolling: true, resave: true, saveUninitialized: false, secret: ((_f = options === null || options === void 0 ? void 0 : options.session) === null || _f === void 0 ? void 0 : _f.secret) || Server.DEFAULT_SESSION_SECRET_KEY, cookie: {
                maxAge: ((_g = options === null || options === void 0 ? void 0 : options.session) === null || _g === void 0 ? void 0 : _g.cookieMaxAge) || Server.DEFAULT_SESSION_COOKIE_MAXAGE,
                secure: false,
                httpOnly: false
            } }, sessionOptions)));
        // Responses should use compression
        if ((options === null || options === void 0 ? void 0 : options.gzip) === true) {
            // Log
            Logger_1["default"].log('info', 'Usando compresión gzip');
            // Use compression
            this.app.use(compression());
        }
        // Passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        // Endpoints
        this.app.use('/api/products', Products_1["default"]);
        this.app.use('/api/carts', Carts_1["default"]);
        this.app.use('/api/orders', Orders_1["default"]);
        this.app.use('/chat', Messaging_1["default"]);
        this.app.use(Auth_1["default"]);
        // Extra endpints (catch all, information, and so)
        this.app
            .get('/info', function (request, response) {
            response.render('info', {
                platform: process.platform,
                argv: JSON.stringify((options === null || options === void 0 ? void 0 : options.argv) || {}),
                execPath: process.execPath,
                pid: process.pid,
                memory: process.memoryUsage.rss(),
                version: process.version,
                cpus: os.cpus().length
            });
        })
            .all('/api(/:called)?', function (request, response) {
            Logger_1["default"].log('warn', "Ruta de API no implementada: ".concat(request.originalUrl));
            response.status(404);
            response.json({
                errorCode: -2,
                error: "".concat(request.method, ":").concat(request.baseUrl).concat(request.url, " no implementado")
            });
        })
            .all('*', function (request, response) {
            Logger_1["default"].log('warn', "Ruta no encontrada: ".concat(request.originalUrl));
            response.status(404).render('error-404');
        });
    }
    /**
     * Gets the app instance
     * @return {Express}
     */
    Server.prototype.getApp = function () {
        // (:
        return this.app;
    };
    /**
     * Starts the server
     */
    Server.prototype.start = function () {
        var _this = this;
        // Listener
        this.server.listen(this.port, function () {
            var port = _this.server.address().port;
            Logger_1["default"].log('info', "Proceso corriendo en puerto ".concat(port, " (PID: ").concat(process.pid, ")"));
        });
        // IO Server
        this.io
            .on('connection', function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1["default"].log('info', "Cliente conectado (ID: ".concat(socket.id, ")"));
                        return [4 /*yield*/, Messaging_2["default"].getAll()];
                    case 1:
                        result = _a.sent();
                        socket.emit('messages', result);
                        socket.on('message', function (_a) {
                            var email = _a.email, avatar = _a.avatar, message = _a.message;
                            return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.messages.create({ email: email, avatar: avatar, message: message })];
                                        case 1:
                                            _b.sent();
                                            this.messages.getAll().then(function (result) { return _this.io.sockets.emit('messages', { messages: result }); });
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        // Error handler
        this.server.on('error', function (err) {
            Logger_1["default"].log('error', "Ocurri\u00F3 un error ".concat(err, "."));
        });
    };
    Server.DEFAULT_PORT = 8080;
    Server.DEFAULT_STATIC_PATH = "".concat(process.cwd(), "/public");
    Server.DEFAULT_VIEWS_PATH = "".concat(process.cwd(), "/views");
    Server.DEFAULT_SESSION_TYPE = 'FILE_STORE';
    Server.DEFAULT_SESSION_SECRET_KEY = '3utc64ueKwXyuNyvEUmKh7uq';
    Server.DEFAULT_SESSION_TTL = 60 * 60 * 24 * 7;
    Server.DEFAULT_SESSION_STORAGE_PATH = "".concat(process.cwd(), "/session-storage");
    Server.DEFAULT_SESSION_COOKIE_MAXAGE = 60 * 60 * 24;
    Server.DEFAULT_SESSION_MONGO_URL = 'mongodb://localhost:27017/ecommerce';
    return Server;
}());
exports["default"] = Server;
