const express = require("express");
const authRouter = express.Router();
const cookieParser = require("cookie-parser");
//const keys = require("../credentials").web;
const passport = require("passport");
// moved to top-level server file
// const session = require("express-session");
const bcrypt = require("bcrypt");
const getConnection = require("./database.js").getConnection;
const knex = getConnection();
require("./auth.js");

// authentication
authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.use(cookieParser());

// session moved to top-level server file
// router.use(
//   session({
//     secret: "something normal",
//     resave: false,
//     saveUninitialized: true
//   })
// );

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  if ((req.authInfo.confirmation = "success")) {
    req.session.regenerate(function() {
      req.session.userid = req.authInfo.result.id;
    })
    res.send({ data: req.authInfo.result });
  } else {
    res.send({ data: "Failure" });
  }
});

authRouter.get("/logout", (req, res) => {
  console.log("requested to logout");
  // changes this to properly destroy session
  req.logout();
  res.redirect("/");
});

authRouter.post("/signup", (req, res) => {
  console.log("requested to signup");
  let password = req.body.password;
  let username = req.body.username;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(`error hasing password:`, err);
      res.status(500).send('error hashing password:', err);
    }
    knex("users")
      .insert([{ username: username, password: hash }])
      .returning('id')
      .then(data => 
        res.send(data))
      .catch(err => {
        console.log(`error message`, err)
        res.status(400).send(err);
      })
    });
});

module.exports = authRouter;
