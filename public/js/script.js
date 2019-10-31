$(document).ready(function() {
    // Getting references to the name input and author container, as well as the table body
    var recipeNameInput = $("");
    var userNameInput= $("");
    var ingredientsInput= $("");
    var instrustionsInput= $("");
    var cookTimeInput= $("");
    var prepTimeInput= $("");

    $(document).on("submit", "#recipe-form", recipeSubmit);

    function recipeSubmit(event) {
        event.preventDefault();
})