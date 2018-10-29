const knex = require("knex")({
  client: 'pg',
  connection: process.env.DATABASE_URL + `?ssl=true`
});
module.exports = {
  getConnection: function() {
    return knex;
  }
};
