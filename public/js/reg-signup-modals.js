$("#signup").on("click", function(event){
    event.preventDefault();
    $("#signUpModal").modal();
  });

   $(".submitNewUser").on("click", function(event) {
      event.preventDefault();
      
      var Owner = {
        user_name: $("#user_name").val().trim(),
        email: $("#emailRegister").val().trim(),
        pass: $("#pass").val().trim(),
        url: $("#owner-pic").val().trim()
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
          $("#emailRegister").val("");
          $("#pass").val("");
          $("#owner-pic").val()

        });

    });

    $("#logInOwner").on("click", function(event){
      event.preventDefault();
      $("#loginOwner").modal();
    });

    $(".submitLogin").on("click", function(event){
      event.preventDefault(); 

      var login = {
          user_name: $("#user").val().trim(),
          pass: $("#passWord").val().trim()
      }
  console.log(login); 
 
  $.post("/api/login", login, function (data) {
  console.log(data);
        if (data) {
          console.log("loged in"); 
           
        Redirect("/profile")

        }

        else {
          alert("Invalid Login");
        }

        $("#user_name").val("");
        $("#pass").val("");

      });

  });

    
  function Redirect(where){
    window.location=where;
  }