
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
//---- ADDD new Property
// $(document).on('click', '#addProp', function (event) {
//     event.preventDefault();

//     var Property = {
//         propName: $("#propName").val().trim(),
//         streetAddress: $("#streetAddress").val().trim(),
//         zipCode: $("#zipCode").val().trim(),
//         city: $("#city").val().trim(),
//         state: $("#state").val().trim(),
//     };

//     $.post("/api/properties", Property,
//         function (data) {
//             if (data) {
//                 Redirect("/profile");
//             }
//             else {
//                 alert("Please Try Again");
//             }
//         });

// });
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
        console.log("update has beeen klicked")
        updateProp();

        function updateProp() {
            console.log(id);
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
        console.log("yayy" + id); 
        event.preventDefault();
        deletePro(); 
        function deletePro() {
            console.log(id);
            $.ajax({
                method: "DELETE",
                url: "/api/properties/" + id,
            }).then(function () {
                    Redirect("/profile");
                });
        }
    });
});
function Redirect(where) {
    window.location = where;
}
$(document).on('click', '#findHomey', function (event){
    var id = $(this).data("id");
    Redirect("/select-homey/"+id); 

});

$(document).on("click", "#bookSitter", function (){
    event.preventDefault();
    var id = $(this).data("prop");
    var sitter = $(this).data("sitter");
    console.log(sitter); 
    updateSitter(); 
    function updateSitter() {
        console.log("this is id"  + id);
        $.ajax({
            method: "PUT",
            url: "/api/property/" +id,
            data: {
               ProviderId: sitter
            }
        }).then(function () {
                Redirect("/profile");
            });
    }

})



