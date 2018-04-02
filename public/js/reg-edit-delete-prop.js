//-------- ADD property----------
$(".addProp").on("click", function(event){
    event.preventDefault();
    $("#addEditDeleteProp").modal();
  });

  $(".submitProp").on("click", function (event) {
    event.preventDefault();

    var Property = {
        propName: $("#propName").val().trim(),
        streetAddress: $("#streetAddress").val().trim(),
        zipCode: $("#zipCode").val().trim(),
        city: $("#city").val().trim(),
        state: $("#state").val().trim(),
    };

    console.log(Property);



    $.post("/api/properties", Property,
        function (data) {

            if (data) {
                Redirect("/profile"); 

            }

            else {
                alert("Please Try Again");
            }
            $("#propName").val("");
            $("#streetAddress").val("");
            $("#zipCode").val("");
            $("#city").val("");
            $("#state").val("");

        });

});
function Redirect(where){
window.location=where;
}