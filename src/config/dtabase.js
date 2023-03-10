// Require mysql
require("dotenv").config();
const Pool = require("pg").Pool;
const Sequelize = require("sequelize");

// Create a connection
// const pool = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     port: process.env.DB_PORT,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
// });

const pool = new Sequelize(DB_URI, {
  define: {
    timestamps: false,
  },
});

module.exports = pool;
