"use strict";
exports.__esModule = true;
exports.config = exports.Container = void 0;
var Mongo_1 = require("./Mongo/Mongo");
var mongodb_1 = require("../config/mongodb");
var Firebase_1 = require("./Firebase/Firebase");
var Knex_1 = require("./Knex/Knex");
var mysql_1 = require("../config/mysql");
var sqlite3_1 = require("../config/sqlite3");
var container, config;
exports.Container = container;
exports.config = config;
switch (process.env.DB_ENGINE) {
    // MySQL/SQLite3
    case 'mysql':
    case 'sqlite3':
        exports.Container = container = Knex_1["default"];
        exports.config = config = process.env.DB_ENGINE === 'mysql' ? mysql_1["default"] : sqlite3_1["default"];
        break;
    // Firebase
    case 'firebase':
        exports.Container = container = Firebase_1["default"];
        exports.config = config = {};
        break;
    // Mongo
    case 'mongo':
    default:
        exports.Container = container = Mongo_1["default"];
        exports.config = config = mongodb_1["default"];
}
