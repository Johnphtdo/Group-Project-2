// Dependencies
var bcrypt = require("bcrypt");
// Requiring our recipe models
var db = require("../models");

// Routes

module.exports = function(app){

    // GET route for getting all recipes by User
    app.get("/api/recipes/:user_name", function(req, res){
        db.Recipe.findAll({
            where: {
                user_name: req.params.user_name
            }
        }).then(function(data){
            res.json(data);
        });
    });

    // GET route for retrieving single recipe
    app.get("/api/recipes/:recipe_name", function(req,res){
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
    app.post("api/recipes",function(req,res){
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
    app.delete("/api/recipes/:id", function(req,res){
        db.Recipe.destroy({
            where: {id: req.params.id}
        }).then(function(data){
            res.json(data);
        });
    });
    }