require('dotenv').config()

const pg = require('pg')
/*
knex setup for access to localhost and production version of the repo
*/
let config = {};
try {
  config = require('./config.js');
} catch (err) {
}
module.exports = {

  development: {
    client: 'pg',
    connection: {
       host:  "localhost",
       user: config.DB_USER || "postgres",
       password: config.DB_PASS || '',
       database: "rentlur"
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`
  }
};
