
$(document).on("click", "#bookSitter", function () {
    event.preventDefault();
    var currentLocation = window.location;
    var propId = currentLocation.href.substr(-1)
    var sitter = $(this).data("sitter");
    updateSitter();
    function updateSitter() {
        $.ajax({
            method: "PUT",
            url: "/api/property/" + propId,
            data: {
                ProviderId: sitter
            }
        }).then(function () {
            Redirect("/profile");
        });
    };

});