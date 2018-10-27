const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
//const keys = require("../credentials").web;
const expressLogging = require("express-logging");
const logger = require("logops");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
const getConnection = require("./database.js").getConnection;
const knex = getConnection();
require("./auth");

// authentication

router.use(passport.initialize());
router.use(passport.session());
router.use(expressLogging(logger));

router.use(cookieParser());
router.use(
  session({
    secret: "MemesAreCool",
    resave: false,
    saveUninitialized: true
  })
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  if ((req.authInfo.confirmation = "success")) {
    console.log("Authenticated");
    //What do I send to let the client know it succeeded to login?
    res.send({ data: "Authenticated" });
  } else {
    console.log("Failure to authenticate");
    
    res.send({ data: "Failure" });
  }
});

router.get("/logout", (req, res) => {
  console.log("requested to logout");
  req.logout();
  res.redirect('/');
});
router.post("/signup", (req, res) => {
  console.log("requested to signup");
  let password = req.body.password;
  let username = req.body.username;
  bcrypt.hash(password, 10, function(err, hash) {
    //puit in db
    if (err) {
      console.log(err);
      return;
    }
    console.log("encrypting password: ", password);
    knex("users")
      .insert([{ username: username, password: hash }])
      .catch(err => console.log(err));
  });
  res.end();
});

module.exports = router;
