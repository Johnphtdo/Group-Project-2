// Requiring our recipe models
var db = require("../models");
var passport = require("passport");
// Routes

module.exports = function (app) {
    // here so that I can check form for styling
    app.get("/add-recipe", function (req, res) {
        res.render("partials/add-block");
    });
    // Routes for the Recipe Table
    app.get("/", function (req, res) {
        res.render("index");
    });

    // Routes for the Recipe Table
    app.get("/view-recipe", function (req, res) {
        // db.Recipe
        // .findAll({})
        // .then(function(data){
        //     var handlebarsObj = {
        //     recipes: data
        //     };
        //     res.render("recipe", handlebarsObj);
        // })
        res.render("partials/recipes/view-block");
    });

    // GET route for getting all recipes by User
    app.get("/api/user/:user_name", function (req, res) {
        console.log(req.params.user_name);
        db.Recipe.findAll({
            where: {
                user_name: req.params.user_name
            }
        }).then(function (data) {
            res.json(data);
            console.log(data);
        });
    });

    // GET route for retrieving single recipe
    app.get("/api/recipe/:recipe_name", function (req, res) {
        db.Recipe.findOne({
            where: {
                recipe_name: req.params.recipe_name
            }
        }).then(function (data) {
            data.ingredients = data.ingredients.trim().replace(/\s,,\s/g, ",").replace(/\s\s/g, " ").replace(/\s,/g, "").split(",");
            console.log(data.ingredients)
            // res.json(data);
            var handlebarsObj = data.dataValues
            // console.log(handlebarsObj)
            res.render("recipe", handlebarsObj)
        });
    });
    // POST route for saving a new recipe

    app.post("/api/recipe", function (req, res) {
        // Commented this out for now until I get passport to work
        //  passport.authenticate('local', { successRedirect: '/add-recipe',
        // failureRedirect: '/users/login',})

        db.Recipe.create({
            user_name: req.body.user_name,
            recipe_name: req.body.recipe_name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            cook_time: req.body.cook_time,
            prep_time: req.body.prep_time
        }).then(function (data) {
            res.json(data);
        });
    });

    // DELETE route for users to delete recipes
    app.delete("/api/recipe/:id", function (req, res) {
        db.Recipe.destroy({
            where: { id: req.params.id }
        }).then(function (data) {
            res.json(data);
        });
    });

    app.put("/api/recipe", function (req, res) {
        db.Recipe.update(req.body, {
            where: { recipe_name: req.body.recipe_name }
        }).then(function (data) {
            res.json(data);
        });
    });
    // passport.authenticate('local', { successRedirect: '/add-recipe',
    // failureRedirect: '/users/login',}),
};
