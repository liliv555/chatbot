"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv/config');
const sequelize_1 = require("sequelize");
const dbName = process.env.PG_DB;
const dbUser = process.env.PG_USER;
const dbHost = process.env.PG_HOST;
const dbPassword = process.env.PG_PASSWORD;
const sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres'
});
exports.default = sequelizeConnection;
//# sourceMappingURL=config.js.map