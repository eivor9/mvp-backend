// http://vitaly-t.github.io/pg-promise/module-pg-promise.html
// db/dbConfig.js

const pgp = require('pg-promise')();
require("dotenv").config();

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;
const cn = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASSWORD,
};

// Create a singleton instance
const db = pgp(cn);

// Export the singleton instance directly
module.exports = db;
