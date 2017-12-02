$(function () {
    $(".eaten-state").on("click", function (event) {
        var id = $(this).data("id");
        var newState = $(this).data("newstate")

        var newEatenState = {
            devoured: true
        };

        // PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newEatenState
        // This then function is not console logging...but is reloading?
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

        var newBurger = {
            name: $("#nw-brg").val().trim()
        };
        console.log(newBurger)
        

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