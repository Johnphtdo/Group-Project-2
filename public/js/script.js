$(document).ready(function () {
    // Getting references to the name input and author container, as well as the table body
    // var recipeNameInput = "";
    // var userNameInput= "";
    // var ingredientsInput= "";
    // var instructionsInput= "";
    // var cookTimeInput= "";
    // var prepTimeInput= "";


    $(document).on("click", "#signIn", signIn);
    $(document).on("click", "#signUp", signUp);
    $(document).on("click", "#searchRecipe", searchRecipe);
    $(document).on("click", "#recipe-form", recipeSubmit);
    $(document).on("click", "#addIngredient", addIngredient);

    function signIn(event) {
        event.preventDefault();

        var userIn = {
            user_name: $("#inputUser").val().trim(),
            password: $("#inputPassword1").val().trim(),
        };
        $.ajax("/api/users", {
            type: "POST",
            data: userIn
        }).then(
            function () {
                console.log("Im in");
                // Reload the page to get the update
                location.reload();
            }
        );
    }

    function signUp(event) {
        event.preventDefault();
    }

    function searchRecipe(event) {
        event.preventDefault();
    }


    function recipeSubmit(event) {
        event.preventDefault();
        var newRecipe = {
            recipe_name: $("#inputRecipeName").val().trim(),
            user_name: $("#inputUserName").val().trim(),
            ingredients: ingredientsArray,
            instructions: $("#inputInstructions").val().trim(),
            cook_time: $("#inputCook").val().trim(),
            prep_time: $("#inputPrep").val().trim(),
        };
        $.ajax("/api/recipe", {
            type: "POST",
            data: newRecipe
        }).then(
            function () {
                console.log("created new recipe");
                
            }
        );
    }


    //this is for ingredients being added
    var ingredientsArray = [];

    function addIngredient(event) {
        event.preventDefault();
        var oneIngredient = $("#inputAmount").val() + " " + $("#inputMeasurement").val() + " " + $("#inputIngredient").val() + " &";
        // console.log(oneIngredient)
        ingredientsArray.push(oneIngredient);
        $("#inputAmount").val(" ");
        $("#inputMeasurement").val(" ");
        $("#inputIngredient").val(" ");
        console.log(ingredientsArray)
        // before empty append ingredient on 76 so they can see add ingredients in new div under
        // console.log(ingredientsArray)
    }



})