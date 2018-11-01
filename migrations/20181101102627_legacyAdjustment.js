
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('favorites' 
    
    .inherits(val)


    .alterTable
    // .createTable('properties', (table) => {
    //     table.increments('id').primary();
    //     // add a field for coordinates - stringified object
    //     table.string('pid');//delete
    //     table.string('category'); // keep as is
    //     table.string('location');//keep as is - street address input by user
    //     table.string('title');//(rename description)
    //     table.string('price');// delete
    //     table.string('url');// delete
    //     table.boolean('hasPic')// keep for now
    //     table.string('date');// keep - timestamp for when row is added
    //     table.integer('user_id').references('id').inTable('users').notNull()
    //       .onDelete('cascade');
    //   });
};


exports.down = function(knex, Promise) {
  // drop new table that was created (reference previous use)
};
