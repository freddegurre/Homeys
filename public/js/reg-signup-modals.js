$("#signup").on("click", function(event){
    event.preventDefault();
    $("#signUpModal").modal();
  });

   $(".submitNewUser").on("click", function(event) {
      event.preventDefault();
      
      var Owner = {
        user_name: $("#user_name").val().trim(),
        email: $("#email").val().trim(),
        pass: $("#pass").val().trim(),
       };

      console.log(Owner);

      $.post("/api/owners", Owner,
        function(data) {

          if (data) {
            console.log(data);
            console.log(data.user_name);
            Redirect("/profile")
          }
          else {
            alert("Please Try Again");
          }
          $("#user_name").val("");
          $("#email").val("");
          $("#pass").val("");

        });

    });
    
  function Redirect(where){
    window.location=where;
  }