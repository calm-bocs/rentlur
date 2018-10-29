/*
knex setup for access to localhost
*/
const knex = require("knex")({
  client: "postgres",
  connection: {
    host: "localhost",
    user: "postgres",
    database: "rentlur"
  },
  pool: { min: 1, max: 7 }
});
module.exports = {
  getConnection: function() {
    return knex;
  }
};
