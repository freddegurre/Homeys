//-------- ADD property----------
$(".addProp").on("click", function(event){
    $("#propName").attr("placeholder", "");
        $("#streetAddress").attr("placeholder","");
        $("#zipCode").attr("placeholder","");
        $("#city").attr("placeholder", "");
        $("#state").attr("placeholder", "");
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
//----- edit property -----
$("#editProp").on("click", function(event){
    var deleteBtn = $("<button>Delete</button>"); 
    deleteBtn.addClass("deleteProp"); 
    $(".modal-body").append(deleteBtn); 
    event.preventDefault();
    var id = $(this).data("id");
    $.get("/api/properties/" + id, function(data){
        console.log(data); 
        $("#propName").attr("placeholder", data.propName);
        $("#streetAddress").attr("placeholder", data.streetAddress);
        $("#zipCode").attr("placeholder", data.zipCode);
        $("#city").attr("placeholder", data.city);
        $("#state").attr("placeholder", data.state);
        $("#addEditDeleteProp").modal();
    })
    $(".submitProp").on("click", function(event){   
        event.preventDefault();
        var Property = {
            propName: $("#propName").val().trim(),
            streetAddress: $("#streetAddress").val().trim(),
            zipCode: $("#zipCode").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim(),
        };
        
        
    })



  


    
  });
function Redirect(where){
window.location=where;
}