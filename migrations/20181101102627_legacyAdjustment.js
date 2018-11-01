
exports.up = function(knex, Promise) {
    return knex.schema.createTable('favorites', (table) => {
      table.increments('id').primary();
      table.string('location');
      table.string('coordinates');
      table.string('description');
      table.string('category');
      table.string('picture');
      table.boolean('public');
      table.timestamps(true, true);
      table.integer('user_id').references('id').inTable('users').notNull()
      .onDelete('cascade');
    })
    .dropTableIfExists('properties');
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('favorites')
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
}
