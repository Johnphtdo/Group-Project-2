// Dependencies
// var bcrypt = require("bcrypt");
// Variables for bcrypt
var saltRounds = 10;

// saltRounds is how many times the password will run through encryption

// Requiring our recipe models
var db = require("../models");

// Routes

module.exports = function(app){
    // Routes for the Recipe Table

    // GET route for getting all recipes by User
    app.get("/api/recipe/:user_name", function(req, res){
        db.Recipe.findAll({
            where: {
                user_name: req.params.user_name
            }
        }).then(function(data){
            res.json(data);
        });
    });

    // GET route for retrieving single recipe
    app.get("/api/recipe/:recipe_name", function(req,res){
        db.Recipe.findOne({
            where: {
                recipe_name: req.params.recipe_name
            }
        })
        .then(function(data){
            res.json(data);
        });
    });
    // POST route for saving a new recipe
    app.post("api/recipe",function(req,res){
        db.Recipe.create({
            user_name: req.body.user_name,
            recipe_name:req.body.recipe_name,
            ingredients:req.body.ingredients,
            instructions:req.body.instructions,
            cook_time:req.body.cook_time,
            prep_time:req.body.prep_time
        }).then(function(data){
            res.json(data);
        });
    });

    // DELETE route for users to delete recipes
    app.delete("/api/recipe/:id", function(req,res){
        db.Recipe.destroy({
            where: {id: req.params.id}
        }).then(function(data){
            res.json(data);
        });
    });

    // Routes for the Users Table
    // POST route for the User_names
    app.post("/api/users", function(req,res){
       var userPW = req.body.password;
       bcrypt.genSalt(saltRounds, function(err, salt) {
        
        bcrypt.hash(userPW, salt, function(err, hash) {
        db.Users.create({
            user_name: req.body.user_name,
            password: hash
        }).then(function(data){
            res.json(data);
        });
    });
});
    });
    // GET route to authenticate users
    app.post("api/users/login", function(req,res){
        var userPW = req.body.password;
        db.Users.findOne({
            where: {
                user_name: req.body.user_name
            }.then(function(data) {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(userPW, salt, function(err, hash) {
                        bcrypt.compare(data.password, hash, function(err, res) {
                            if(res){res.send("it works")}
                            else{res.send(err)}
                        });
                    });
                });
            })
        });
    });

}