var db = require("../models");
// Dependencies
var bcrypt = require("bcrypt");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
// Variables for bcrypt
var saltRounds = 10;

module.exports = function(app) {
  // Routes for the Users Table

  app.get("/users/login",function(req,res){
      res.render("partials/login")
  })

  // POST route for the User_names
  app.post("/users/register", function(req, res) {
    var userPW = req.body.password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(userPW, salt, function(err, hash) {
        db.Users.create({
          user_name: req.body.user_name,
          password: hash
        }).then(function(data) {
          res.json(data);
        });
      });
    });
  });

  //login page: storing and comparing username and password,and redirecting to / page after login
  app.post("/users/login", function(req, res) {
    var userPW = req.body.password;
    db.Users.findOne({
      where: {
        user_name: req.body.user_name
      }
    }).then(function(user) {
      if (!user) {
        res.redirect("/");
      } else {
        bcrypt.compare(userPW, user.password, function(err, result) {
          if (result == true) {
            res.redirect("/");
          } else {
            res.send("Incorrect password");
            res.redirect("/");
          }
        });
      }
    });
  });
};