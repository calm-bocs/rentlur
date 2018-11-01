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
      // add a field for coordinates - stringified object/array tbd
      table.string('pid');//delete
      table.string('category'); // keep as is
      table.string('location');//keep as is - street address input by user
      table.string('title');//(rename description)
      table.string('price');// delete
      table.string('url');// delete
      table.boolean('hasPic')// keep for now
      table.string('date');// keep - timestamp for when row is added
      table.integer('user_id').references('id').inTable('users').notNull()
        .onDelete('cascade');
    });
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('properties'),
    knex.schema.dropTableIfExists('users')]);
};
