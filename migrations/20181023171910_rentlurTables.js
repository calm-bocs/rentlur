/*
creates two tables: 
  a users table with: 
    a unique username 
    an auto incremented id
    a hashed password
  a properties table for saved properties with:
    an autoincrementing id
    a pid from craigslise
    a category of search
    a location it was searched from
    the title of the ad
    the price listed
    the url of the page
    whether it has a picture(boolean)
    the date it was searched for
    the user id that saved it (foreign key)
*/
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique();
      table.string('password');
    })
    .createTable('properties', (table) => {
      table.increments('id').primary();
      table.string('pid');//
      table.string('category');
      table.string('location');//
      table.string('title');
      table.string('price');//
      table.string('url');//
      table.boolean('hasPic')//
      table.string('date');//
      table.integer('user_id').references('id').inTable('users').notNull()
        .onDelete('cascade');
    });
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('properties'),
    knex.schema.dropTableIfExists('users')]);
};
