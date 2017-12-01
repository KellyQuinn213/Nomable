$(function () {
    $(".eaten-state").on("click", function (event) {
        var id = $(this).data("id");
        var newState = $(this).data("newstate")

        var newEatenState = {
            devoured: newState
        };

        // PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newEatenState
        }).then(
            function () {
                console.log("Burger has been devoured!", newState)
                location.reload();
            }
            );
    });

    $("#submit").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log($("#nw-brg").val().trim())

        var newBurger = {
            name: $("#nw-brg").val().trim(),
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("You've added a new burger");

                location.reload();
            }
        );
    });
});