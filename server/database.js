/*
knex setup for access to localhost
*/
let config = {};
try {
  config = require('../config.js');
} catch (err) {
}

const knex = require("knex")({
  client: "postgres",
  connection: {
    host:  "localhost",
    user: config.DB_USER || "postgres",
    password: config.DB_PASS || '',
    database: "rentlur"
  }, 
  pool: { min: 1, max: 7 }
});
module.exports = {
  getConnection: function() {
    return knex;
  }
};
