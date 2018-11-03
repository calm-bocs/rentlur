exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique();
      table.string('password');
    })
    .createTable('properties', (table) => {
      table.increments('id').primary();
      table.string('pid');
      table.string('category');
      table.string('location');
      table.string('title');
      table.string('price');
      table.string('url');
      table.boolean('hasPic')
      table.string('date');
      table.integer('user_id').references('id').inTable('users').notNull()
        .onDelete('cascade');
    });
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('properties'),
    knex.schema.dropTableIfExists('users')]);
};
