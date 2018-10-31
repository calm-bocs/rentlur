require('dotenv').config()

const pg = require('pg')
/*
knex setup for access to localhost and production version of the repo
*/
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'rentlurpg',
      password: 'rentlurpgpass',
      database: 'rentlur',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`
  }
};
