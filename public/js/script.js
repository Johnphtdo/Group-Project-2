$(document).ready(function() {
    // Getting references to the name input and author container, as well as the table body
    // var recipeNameInput = "";
    // var userNameInput= "";
    // var ingredientsInput= "";
    // var instructionsInput= "";
    // var cookTimeInput= "";
    // var prepTimeInput= "";

    $(document).on("click", "#recipe-form", recipeSubmit);

    function recipeSubmit(event) {
        event.preventDefault();

        var newRecipe = {
            name: $("#burg").val().trim(),
            user_name: $("#inputRecipeName").val().trim(),
            recipe_name: $("#inputUserNameg").val().trim(),
            // ingredients: $("#burg").val().trim(), inputAmount, need Measurements, inputIngredient
            instructions: $("#inputInstructions").val().trim(),
            cook_time: $("#inputCook").val().trim(),
            prep_time: $("#inputPrep").val().trim(),
        };
        $.ajax("/api/recipe", {
            type: "POST",
            data: newRecipe
          }).then(
            function() {
              console.log("created new recipe");
              // Reload the page to get the updated list
              location.reload();
            }
          );
    }





})