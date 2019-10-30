// * Requires
const express = require("express");
const exphbs = require("express-handlebars");
//const routes = require("");//include the controller file

/* ----------------------------------------------
 * SET UP App
 * ---------------------------------------------- */
var PORT = process.env.PORT || 8080;

// * App creation
var app = express();

// * Serving public files
app.use(express.static("public"));

// * App parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Adding routes
//app.use(routes);

/* ----------------------------------------------
 * SET UP Handlebars
 * ---------------------------------------------- */
// * Adding handlebars to the app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/* ----------------------------------------------
 * START Server
 * ---------------------------------------------- */
app.listen(PORT, function() {
    console.log("App now listening at http://localhost:" + PORT);
});


