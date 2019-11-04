// Requiring our recipe models
var db = require("../models");
var passport = require("passport")
// Routes

module.exports = function(app){
   // Route for adding recipe page
    app.get("/add-recipe", function(req, res) {
        res.render("partials/add-block");
    });
 // Routes for the Recipe Table
    app.get("/", function(req, res) {
        res.render("index");
    });
// Route for Recipe pages
    app.get("/view-recipe", function(req, res) {
        res.render("partials/view-block");
    });


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

    app.post("/api/recipe",  passport.authenticate('local', { successRedirect: '/add-recipe',
    failureRedirect: '/users/login',}), function(req,res){

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

}
