const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const getConnection = require("./database.js").getConnection;
const knex = getConnection();
const bcrypt = require('bcrypt');


passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((id, done) => {
  knex
    .select("*")
    .from("users")
    .where("username", id)
    .then(user => done(null, user[0]))
    .catch(err => done(err, null));
});

passport.use(
  new LocalStrategy((username, password, done) => {
    knex
      .select("*")
      .from("users")
      .where({username: username})
      .then(user => {
        if (!user[0]) {
          console.log("username does not exist");
          return done(null, false, { message: "username does not exist" });
        } else {
        bcrypt.compare(password, user[0].password, function(err, res) {
          console.log(res);
          if (res) {
            user = user[0];
            user.id = user.id;
            delete user.password;
            done(null, user, { confirmation: "success", result: user });
          } else {
            done(err, null, { confirmation: "failure", result: null });
          }
        })}
      })
      .catch(err => {
        console.log("error in auth - trouble finding user");
        done(err, null, { confirmation: "failure", result: null });
      });
  })
);
