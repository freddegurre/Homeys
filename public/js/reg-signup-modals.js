$("#signup").on("click", function(event){
    event.preventDefault();
    $("#signUpModal").modal();
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