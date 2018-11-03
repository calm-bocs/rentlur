const bcrypt = require('bcrypt');

//populates the psql database after migration has been run with example data
exports.seed = (knex, Promise) => {
  return knex("users")
    .del()
    .then(() => knex("favorites").del())
    .then(() =>
      knex("users").insert([
        { username: "Chris", password: bcrypt.hashSync("Chris", 10) },
        { username: "Mitch", password: bcrypt.hashSync("Mitch", 10) },
        { username: "Lucas", password: bcrypt.hashSync("Lucas", 10) },
        { username: "Alberto", password: bcrypt.hashSync("Alberto", 10) }
      ])
    )
    .then(() =>
      knex("favorites").insert([
        {
          location: '119 Nueces St, Austin, TX 78701, USA',
          coordinates: '{"latitude":"30.2655566","longitude":"-97.74969850000002"}',
          description: 'Galvanize',
          category: 'work',
          picture: '',
          public: false,
          user_id: "1"
        },
        {
          location: '360 Nueces St #20, Austin, TX 78701, USA',
          coordinates: '{"latitude":30.2670418,"longitude":-97.74981359999998}',
          description: 'Happy Chicks',
          category: 'food',
          picture: '',
          public: true,
          user_id: "1"
        },
        {
          location: '1701 W Ben White Blvd, Austin, TX 78704, USA',
          coordinates: '{"latitude":30.2269416,"longitude":-97.7829418}',
          description: 'Blazer Tag',
          category: 'games',
          picture: '',
          public: true,
          user_id: "2"
        },
        {
          location: '3012 Honey Tree Ln, Austin, TX 78746, USA',
          coordinates: '{"latitude":30.2697975,"longitude":-97.79658519999998}',
          description: 'Girlfriend\'s house',
          category: 'personal',
          picture: '',
          public: false,
          user_id: "3"
        },
        {
          location: '2805 Bee Cave Rd, Austin, TX 78746, USA',
          coordinates: '{"latitude":30.2701339,"longitude":-97.78981139999996}',
          description: 'Trader Joe\'s',
          category: 'grocery',
          picture: '',
          public: true,
          user_id: "4"
        }
      ])
    );
};
