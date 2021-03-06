
//-------- ADD property----------
$(document).on('click', '.addProp', function (event) {
    event.preventDefault();
    $("#updateProp").hide();
    $("#deleteProp").hide();
    $("#addProp").show();
    $("#propName").val("");
    $("#streetAddress").val("");
    $("#zipCode").val("");
    $("#city").val("")
    $("#state").val("")
    $("#addEditDeleteProp").modal();
});

//----- edit property -----
$(document).on('click', '#editProp', function (event) {
    $("#addProp").hide();
    event.preventDefault();
    var id = $(this).data("id");
    $.get("/api/properties/" + id, function (data) {
        $("#propName").val(data.propName);
        $("#streetAddress").val(data.streetAddress);
        $("#zipCode").val(data.zipCode);
        $("#city").val(data.city);
        $("#state").val(data.state);
        $("#addEditDeleteProp").modal();
    })
    $(document).on('click', '#updateProp', function (event) {
        event.preventDefault();
        updateProp();
        function updateProp() {
        
            $.ajax({
                method: "PUT",
                url: "/api/property/" + id,
                data: {
                    propName: $("#propName").val().trim(),
                    streetAddress: $("#streetAddress").val().trim(),
                    zipCode: $("#zipCode").val().trim(),
                    city: $("#city").val().trim(),
                    state: $("#state").val().trim(),
                }
            }).then(function () {
                    Redirect("/profile");
                });
        }
    })
    $(document).on('click', '#deleteProp', function (event){
        event.preventDefault();
        deletePro(); 
        function deletePro() {
            $.ajax({
                method: "DELETE",
                url: "/api/properties/" + id,
            }).then(function () {
                    Redirect("/profile");
                });
        }
    });
});

$(document).on('click', '#findHomey', function (event){
    var id = $(this).data("id");
    Redirect("/select-homey/"+id); 

});

function Redirect(where) {
    window.location = where;
}





