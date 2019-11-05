$(".nav-item").on("click", function() {
    
});

$(document).ready(function () {

    $(document).on("click", "#signIn", signIn);
    $(document).on("click", "#signUp", signUp);
    $(document).on("click", "#recipe-form", recipeSubmit);
    $(document).on("click", "#addIngredient", addIngredient);

    function signIn(event) {
        event.preventDefault();
        var userIn = {
            user_name: $("#inputUser").val().trim(),
            password: $("#inputPassword1").val().trim(),
        };
        $.post('/users/login', userIn).then(function (data) {
            // console.log(data);
            
        })
    }

    function signUp(event) {
        event.preventDefault();
        var newUser = {
            user_name: $('#inputUser').val().trim(),
            password: $('#inputPassword1').val().trim(),
        };

        $.post('/users/register', newUser).then(function (data) {
            console.log(data);
            console.log("New User")
        })
    }

    $(document).on("click", ".searchBtn", function () {
        var btnText = $(this).attr("data-text");
        $("#searchMe").html(btnText);

        if (btnText === "Search by User Name") {
            $("#searchMe").attr("data-value", "user_name");
        } else {
            $("#searchMe").attr("data-value", "recipe_name");
        }
    })

    $(document).on("click", "#searchMe", function () {
        event.preventDefault();
        var url;
        var userInput = $("#searchwhat").val();
        if ($("#searchMe").attr("data-value") === "user_name") {
            url = "user";
        } else {
            url = "recipe"
        }
        var query = "/api/" + url + "/" + userInput;
        console.log(query)
        $.ajax({
            url: query,
            type: "GET",
        }).then(
                function (data) {
                    console.log(data);

                })
    });

    //need a validation that they have signed in before running function
    function recipeSubmit(event) {
        event.preventDefault();

        var newRecipe = {
            recipe_name: $("#inputRecipeName").val().trim(),
            user_name: $("#inputUserName").val().trim(),
            ingredients: ingredientsArray.toString(),
            instructions: $("#inputInstructions").val().trim(),
            cook_time: parseInt($("#inputCook").val().trim()),
            prep_time: parseInt($("#inputPrep").val().trim()),

        }
        console.log(newRecipe)
        $.ajax("/api/recipe", {
            type: "POST",
            data: newRecipe
        }).then(
            function () {
                $('#showMeTheModal').modal('toggle');
                // console.log()
                console.log("created new recipe");
            }
        );
    };

    //this is for ingredients being added
    var ingredientsArray = [];

    function addIngredient(event) {
        event.preventDefault();
        //need to remove & and insert commas where split occurs
        var oneIngredient = $("#inputAmount").val() + " " + $("#inputMeasurement").val() + " " + $("#inputIngredient").val() + " ,";
        console.log(oneIngredient);
        ingredientsArray.push(oneIngredient);
        $('.ingredientsInMe').append(oneIngredient);
        $("#inputAmount").val(" ");
        $("#inputMeasurement").val(" ");
        $("#inputIngredient").val(" ");
        console.log(ingredientsArray)
    };

})