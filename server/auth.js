const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const getConnection = require("./database.js").getConnection;
const bcrypt = require('bcrypt');
const knex = getConnection();

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
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
        if (!user) {
          console.log("Incorrect username");

          return done(null, false, { message: "Incorrect username." });
        }
        bcrypt.compare(password, user[0].password, function(err, res) {   
          console.log(res);
          if(res){
            user = user[0];
            user.id = user.id;
            delete user.password;
            done(null, user, { confirmation: "success", result: user });
          }else{
            done(err, null, { confirmation: "failure", result: null });
          }
        })
      })
      .catch(err => {
        console.log("Didnt find User ");
        done(err, null, { confirmation: "failure", result: null });
      });
  })
);
