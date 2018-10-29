const knex = require("knex")({
  client: 'pg',
  connection: process.env.DATABASE_URL + `?ssl=true`,
  pool: { min: 1, max: 7 }
});
module.exports = {
  getConnection: function() {
    return knex;
  }
};
